import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DomSanitizer, SafeHtml, SafeUrl } from '@angular/platform-browser';

/**
 * XSS Demo Component
 * 
 * Demonstra 4 cenários de XSS (Cross-Site Scripting):
 * 1. SEGURO: Interpolação text binding - Angular sanitiza automaticamente
 * 2. PERIGOSO: innerHTML com dados do usuário (sem proteção)
 * 3. RISCO: bypassSecurityTrustHtml (breaking Angular protection)
 * 4. ALTERNATIVA: Usando component content em vez de HTML string
 * 
 * Padrão: Strategy Pattern para diferentes formas de renderização
 * 
 * Educacional:
 * - Mostrar diferença entre seguro e inseguro
 * - Demonstrar como Angular sanitiza
 * - Explicar quando usar bypassSecurityTrust (raramente!)
 */
@Component({
  selector: 'app-xss-demo',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="xss-demo">
      <!-- Input para simular dados do usuário -->
      <div class="demo-section">
        <h3>🎯 Input de Teste (Simular Usuário Malicioso)</h3>
        <input 
          [(ngModel)]="userInput"
          type="text"
          placeholder="Cole aqui um script XSS: <img src=x onerror=alert('XSS')>"
          class="user-input"
        />
        <button (click)="resetInput()" class="btn-reset">Limpar</button>
      </div>

      <!-- Exemplo 1: SEGURO - Text Binding -->
      <div class="demo-section safe">
        <h3>✅ SEGURO: Interpolação (Text Binding)</h3>
        <p class="description">
          Angular sanitiza automaticamente. Mesmo código malicioso é exibido como texto.
        </p>
        <div class="example-box">
          <strong>Código:</strong>
          <pre>&lt;p&gt;<span>{{ '{' }}</span><span>{{ '}' }}</span> userInput <span>{{ '{' }}</span><span>{{ '}' }}</span>&lt;/p&gt;</pre>
          <strong>Resultado:</strong>
          <div class="result">
            Seu input: <span>{{ userInput }}</span>
          </div>
        </div>
      </div>

      <!-- Exemplo 2: PERIGOSO - innerHTML sem sanitização -->
      <div class="demo-section danger">
        <h3>❌ PERIGOSO: innerHTML sem sanitização</h3>
        <p class="description">
          Não use [innerHTML] com dados do usuário! Angular vai executar o script.
        </p>
        <div class="example-box">
          <strong>Código:</strong>
          <pre>&lt;div [innerHTML]="userInput"&gt;&lt;/div&gt;</pre>
          <strong>Resultado:</strong>
          <div class="result">
            <div [innerHTML]="userInput"></div>
          </div>
        </div>
        <p class="warning">
          ⚠️ Se o input contiver &lt;img src=x onerror=...&gt;, o script será executado!
        </p>
      </div>

      <!-- Exemplo 3: BYPASS - Forçar renderização de HTML (perigoso!) -->
      <div class="demo-section bypass">
        <h3>⚠️ BYPASS (Muito Perigoso): bypassSecurityTrustHtml</h3>
        <p class="description">
          Você está dizendo: "Confio 100% nesse HTML". Use APENAS com dados confiáveis.
        </p>
        <div class="example-box">
          <strong>Código:</strong>
          <pre>sanitizer.bypassSecurityTrustHtml(userInput)</pre>
          <strong>Resultado:</strong>
          <div class="result">
            <div [innerHTML]="bypassedHtml"></div>
          </div>
        </div>
        <p class="warning">
          ⚠️ Mesmo HTML confiável pode ter imperfeições. NUNCA faça isso com dados do usuário!
        </p>
      </div>

      <!-- Exemplo 4: ALTERNATIVA - Usar components em vez de HTML strings -->
      <div class="demo-section safe">
        <h3>✅ ALTERNATIVA: Usar Components + @Input</h3>
        <p class="description">
          Melhor solução: passar dados como propriedades tipadas, não como HTML.
        </p>
        <div class="example-box">
          <strong>Padrão:</strong>
          <pre>&lt;app-child [data]="userInput"&gt;&lt;/app-child&gt;</pre>
          <strong>Benefícios:</strong>
          <ul>
            <li>✓ Tipagem TypeScript</li>
            <li>✓ Nenhum risco de XSS</li>
            <li>✓ Mais testável</li>
            <li>✓ Composição reusável</li>
          </ul>
        </div>
      </div>

      <!-- Resumo -->
      <div class="demo-section summary">
        <h3>📋 Resumo de Segurança</h3>
        <table>
          <thead>
            <tr>
              <th>Método</th>
              <th>Segurança</th>
              <th>Quando Usar</th>
            </tr>
          </thead>
          <tbody>
            <tr class="safe-row">
              <td><strong><span>{{ '{' }}</span><span>{{ '}' }}</span></strong></td>
              <td>✅ Seguro</td>
              <td>Sempre! (dados dinâmicos simples)</td>
            </tr>
            <tr class="safe-row">
              <td><strong>Components + @Input</strong></td>
              <td>✅ Seguro</td>
              <td>Estrutura complexa ou reusável</td>
            </tr>
            <tr class="danger-row">
              <td><strong>[innerHTML]</strong></td>
              <td>❌ Perigoso</td>
              <td>NUNCA com dados do usuário</td>
            </tr>
            <tr class="warning-row">
              <td><strong>bypassSecurityTrustHtml</strong></td>
              <td>⚠️ Alto Risco</td>
              <td>Apenas dados internos confiáveis</td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Dicas de HTTP Security -->
      <div class="demo-section">
        <h3>🌐 Dicas de HTTP Security Headers</h3>
        <p class="description">
          No backend/servidor, configure esses headers HTTP para proteção extra:
        </p>
        <pre><code>Content-Security-Policy: default-src 'self'; script-src 'self'
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
X-XSS-Protection: 1; mode=block</code></pre>
      </div>
    </div>
  `,
  styles: [`
    .xss-demo {
      padding: 20px;
    }

    .demo-section {
      margin: 20px 0;
      padding: 20px;
      border-radius: 8px;
      background: #fafafa;
      border-left: 4px solid #1976d2;
    }

    .demo-section.safe {
      border-left-color: #388e3c;
      background: #f1f8e9;
    }

    .demo-section.danger {
      border-left-color: #d32f2f;
      background: #ffebee;
    }

    .demo-section.bypass {
      border-left-color: #ff6f00;
      background: #fff3e0;
    }

    .demo-section.summary {
      border-left-color: #7b1fa2;
      background: #f3e5f5;
    }

    h3 {
      margin-top: 0;
      margin-bottom: 10px;
      color: #333;
    }

    .description {
      font-size: 14px;
      color: #666;
      margin: 10px 0;
      font-style: italic;
    }

    .user-input {
      width: 100%;
      padding: 10px;
      border: 2px solid #1976d2;
      border-radius: 4px;
      font-family: 'Courier New', monospace;
      font-size: 12px;
      margin-bottom: 10px;
    }

    .btn-reset {
      padding: 8px 16px;
      background: #1976d2;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-weight: bold;
    }

    .btn-reset:hover {
      background: #1565c0;
    }

    .example-box {
      background: white;
      padding: 15px;
      border-radius: 4px;
      margin: 10px 0;
    }

    .example-box strong {
      display: block;
      margin-top: 10px;
      color: #1976d2;
      font-weight: bold;
    }

    .example-box strong:first-child {
      margin-top: 0;
    }

    pre {
      background: #f5f5f5;
      padding: 10px;
      border-radius: 4px;
      overflow-x: auto;
      font-size: 12px;
      margin: 5px 0;
      font-family: 'Courier New', monospace;
    }

    .result {
      padding: 10px;
      background: #f0f0f0;
      border: 1px dashed #999;
      border-radius: 4px;
      min-height: 30px;
      word-break: break-word;
    }

    .warning {
      color: #d32f2f;
      font-size: 13px;
      margin-top: 10px;
      font-weight: bold;
    }

    table {
      width: 100%;
      border-collapse: collapse;
      background: white;
    }

    th {
      background: #f5f5f5;
      padding: 12px;
      text-align: left;
      font-weight: bold;
      border-bottom: 2px solid #ddd;
    }

    td {
      padding: 12px;
      border-bottom: 1px solid #ddd;
    }

    .safe-row {
      background: #f1f8e9;
    }

    .danger-row {
      background: #ffebee;
    }

    .warning-row {
      background: #fff3e0;
    }

    ul {
      margin: 0;
      padding: 0 20px;
    }

    ul li {
      margin: 5px 0;
    }

    code {
      background: #f5f5f5;
      padding: 2px 4px;
      border-radius: 3px;
      font-family: 'Courier New', monospace;
      font-size: 12px;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class XssDemoComponent {
  userInput: string = '';
  bypassedHtml: SafeHtml = '';

  constructor(private sanitizer: DomSanitizer) {}

  /**
   * Atualiza HTML "seguro" (forçado) sempre que input muda
   * Demonstra como bypassSecurityTrustHtml renderiza sem sanitização
   */
  set userInputValue(value: string) {
    this.userInput = value;
    // Simula cenário onde você conhece o HTML: exemplo legítimo de Markdown renderizado
    this.bypassedHtml = this.sanitizer.bypassSecurityTrustHtml(value);
  }

  resetInput(): void {
    this.userInput = '';
    this.bypassedHtml = '';
  }
}
