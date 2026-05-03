import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { XssDemoComponent } from '../components/xss-demo/xss-demo.component';

/**
 * Page Container: Security Lab
 * 
 * Propósito: Demonstrar vulnerabilidades de segurança (XSS) e
 * como o Angular protege contra elas automaticamente.
 * 
 * Padrão: Facade + Container
 * - Orquestra subcomponentes de demonstração
 * - Centraliza navegação entre exemplos de segurança
 * 
 * Educacional:
 * - XSS (Cross-Site Scripting): Injeção de código JavaScript malicioso
 * - Angular sanitiza interpolação {{ }} por padrão
 * - bypassSecurityTrustHtml permite HTML confiável (com cuidado!)
 * - Validação de entrada é essencial
 */
@Component({
  selector: 'app-security-lab-page',
  standalone: true,
  imports: [CommonModule, XssDemoComponent],
  template: `
    <div class="security-lab-page">
      <h1>🔒 Security Lab - Proteção contra XSS</h1>
      
      <div class="intro">
        <p>
          <strong>XSS (Cross-Site Scripting)</strong> é uma vulnerabilidade onde 
          código JavaScript malicioso é injetado e executado no navegador.
        </p>
        <p>
          Angular protege você <strong>por padrão</strong>, mas você ainda pode 
          criar vulnerabilities se não souber o que está fazendo.
        </p>
      </div>

      <!-- Componente que demonstra exemplos de XSS -->
      <app-xss-demo></app-xss-demo>

      <div class="best-practices">
        <h2>🛡️ Melhores Práticas</h2>
        <ul>
          <li><strong>Sempre use text binding</strong> para exibir dados dinâmicos (sem HTML)</li>
          <li><strong>Evite innerHTML</strong> - use PrivateBinding ou component content</li>
          <li><strong>Nunca confie em bypassSecurityTrustHtml</strong> com dados do usuário</li>
          <li><strong>Valide entrada</strong> no backend e frontend</li>
          <li><strong>Use Content Security Policy</strong> headers HTTP</li>
          <li><strong>Sanitize URLs</strong> com DomSanitizer se necessário</li>
          <li><strong>Mantenha Angular atualizado</strong> para patches de segurança</li>
        </ul>
      </div>
    </div>
  `,
  styles: [`
    .security-lab-page {
      max-width: 900px;
      margin: 0 auto;
      padding: 20px;
    }

    h1 {
      color: #d32f2f;
      margin-bottom: 20px;
      text-align: center;
    }

    h2 {
      color: #1976d2;
      margin-top: 30px;
      margin-bottom: 15px;
    }

    .intro {
      background: #f5f5f5;
      border-left: 4px solid #d32f2f;
      padding: 15px;
      margin-bottom: 30px;
      border-radius: 4px;
    }

    .intro p {
      margin: 10px 0;
      line-height: 1.6;
    }

    .best-practices {
      background: #e8f5e9;
      border-left: 4px solid #388e3c;
      padding: 20px;
      border-radius: 4px;
      margin-top: 30px;
    }

    .best-practices ul {
      list-style: none;
      padding: 0;
    }

    .best-practices li {
      padding: 8px 0;
      line-height: 1.6;
      font-size: 14px;
    }

    .best-practices li:before {
      content: "✓ ";
      color: #388e3c;
      font-weight: bold;
      margin-right: 10px;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SecurityLabPageComponent {}
