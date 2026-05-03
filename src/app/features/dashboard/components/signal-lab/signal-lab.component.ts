import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';

@Component({
  selector: 'app-signal-lab',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './signal-lab.component.html',
  styleUrl: './signal-lab.component.scss'
})
export class SignalLabComponent {
  // Estado local com Signals: cada valor reage imediatamente às mudanças.
  counter = signal(0);
  name = signal('');

  // Computed: valores derivados que não são armazenados, apenas calculados.
  nameLength = computed(() => this.name().length);
  doubledCounter = computed(() => this.counter() * 2);
  isEven = computed(() => this.counter() % 2 === 0);
  status = computed(() => {
    const count = this.counter();
    if (count < 0) return 'Negativo';
    if (count === 0) return 'Zero';
    if (count < 5) return 'Baixo';
    return 'Alto';
  });

  increment(): void {
    this.counter.update((val: number) => val + 1);
  }

  decrement(): void {
    this.counter.update((val: number) => val - 1);
  }

  resetCounter(): void {
    // set substitui o valor inteiro; update seria para transformação incremental.
    this.counter.set(0);
  }

  onNameChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.name.set(target.value);
  }
}
