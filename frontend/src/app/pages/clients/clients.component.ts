import { Component, inject, signal, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ClientService, type ClientDto } from '../../services/client.service';
import { ClientInsuranceService } from '../../services/client-insurance.service';
import { InsuranceTypeService, type InsuranceTypeDto } from '../../services/insurance-type.service';

@Component({
  selector: 'app-clients',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css'],
})
export class ClientsComponent {
  private readonly clientSrv = inject(ClientService);
  private readonly ciSrv = inject(ClientInsuranceService);

  protected readonly clients = signal<ClientDto[]>([]);
  protected readonly loading = signal(false);
  protected readonly insuranceTypes = signal<InsuranceTypeDto[]>([]);
  protected readonly assigningClient = signal<ClientDto | null>(null);
  protected selectedInsuranceTypeId = signal<number | null>(null);
  protected readonly clientInsurances = signal<any[]>([]);
  protected managingClient = signal<ClientDto | null>(null);

  @ViewChild('clientModal') clientModal!: ElementRef<HTMLDialogElement>;
  @ViewChild('assignModal') assignModal!: ElementRef<HTMLDialogElement>;
  @ViewChild('manageModal') manageModal!: ElementRef<HTMLDialogElement>;

  protected form: ClientDto = { clientType: 'PERSON', identification: '', email: '', name: '' };

  constructor() {
    this.load();
    this.loadInsuranceTypes();
  }

  private loadInsuranceTypes(): void {
    const srv = inject(InsuranceTypeService);
    srv.getAll().subscribe({
      next: (r) => this.insuranceTypes.set((r.data as InsuranceTypeDto[]) || []),
      error: () => this.insuranceTypes.set([]),
    });
  }

  load(): void {
    this.loading.set(true);
    this.clientSrv.getClients().subscribe({
      next: (res) => {
        this.clients.set((res.data as ClientDto[]) || []);
        this.loading.set(false);
      },
      error: () => this.loading.set(false),
    });
  }

  openAdd(): void {
    this.clientModal.nativeElement.showModal();
  }
  closeAdd(): void {
    this.clientModal.nativeElement.close();
  }

  save(): void {
    this.clientSrv.createClient(this.form).subscribe({
      next: () => {
        this.load();
        this.closeAdd();
      },
      error: (e) => alert(e?.error?.message || 'Error'),
    });
  }

  openAssignModal(client: ClientDto): void {
    this.assigningClient.set(client);
    this.selectedInsuranceTypeId.set(this.insuranceTypes()[0]?.id ?? null);
    this.assignModal.nativeElement.showModal();
  }

  closeAssignModal(): void {
    this.assignModal.nativeElement.close();
    this.assigningClient.set(null);
    this.selectedInsuranceTypeId.set(null);
  }

  confirmAssign(): void {
    const client = this.assigningClient();
    const insuranceTypeId = this.selectedInsuranceTypeId();
    if (!client || !insuranceTypeId) return alert('Seleccione un tipo de seguro');
    this.ciSrv.assign(client.id as number, insuranceTypeId).subscribe({
      next: () => {
        alert('Assigned');
        this.closeAssignModal();
      },
      error: (e) => alert(e?.error?.message || 'Error'),
    });
  }

  openManageModal(client: ClientDto): void {
    this.managingClient.set(client);
    this.clientInsurances.set([]);
    this.manageModal.nativeElement.showModal();
    this.ciSrv
      .getByClient(client.id as number)
      .subscribe({
        next: (r) => this.clientInsurances.set((r.data as any[]) || []),
        error: () => this.clientInsurances.set([]),
      });
  }

  closeManageModal(): void {
    this.manageModal.nativeElement.close();
    this.managingClient.set(null);
    this.clientInsurances.set([]);
  }

  doCancel(insuranceId: number): void {
    const client = this.managingClient();
    if (!client) return;
    this.ciSrv.cancel(client.id as number, insuranceId).subscribe({
      next: () => {
        alert('Cancelled');
        this.openManageModal(client);
      },
      error: (e) => alert(e?.error?.message || 'Error'),
    });
  }

  doReactivate(insuranceId: number): void {
    const client = this.managingClient();
    if (!client) return;
    this.ciSrv.reactivate(client.id as number, insuranceId).subscribe({
      next: () => {
        alert('Reactivated');
        this.openManageModal(client);
      },
      error: (e) => alert(e?.error?.message || 'Error'),
    });
  }

  cancelInsurance(client: ClientDto): void {
    const insuranceId = Number(prompt('Insurance ID to cancel') || '0');
    if (!insuranceId) return;
    this.ciSrv.cancel(client.id as number, insuranceId).subscribe({
      next: () => alert('Cancelled'),
      error: (e) => alert(e?.error?.message || 'Error'),
    });
  }

  reactivateInsurance(client: ClientDto): void {
    const insuranceId = Number(prompt('Insurance ID to reactivate') || '0');
    if (!insuranceId) return;
    this.ciSrv.reactivate(client.id as number, insuranceId).subscribe({
      next: () => alert('Reactivated'),
      error: (e) => alert(e?.error?.message || 'Error'),
    });
  }
}
