#  Angular 21 Study App - Projeto Educacional

Um projeto **100% dedicado ao estudo** de Angular 21+ com padrões modernos, arquitetura profissional e exemplos práticos de laboratórios interativos.

##  Sobre este Projeto

Este é um aplicativo de referência para **aprender Angular no contexto real**, não apenas teoria. Cada tela, componente e funcionalidade foi construída com fins didáticos, incluindo:

- ✅ **Padrões de Arquitetura**: Feature-based, separação de responsabilidades (page containers, componentes de apresentação, shared components)
- ✅ **Padrões GoF Comentados**: Observer, Facade, Singleton, Composite, Chain of Responsibility
- ✅ **Testes Unitários Comentados**: 40+ testes com explicações de cada estratégia
- ✅ **Laboratórios Interativos**: RxJS, Signals, Forms (Reactive e Template-driven), HttpClient
- ✅ **Infraestrutura Angular**: Interceptors, Guards, Resolvers, Roteamento

### Comparação: Angular vs React

Para quem vem do React, aqui estão as equivalências e diferenças principais:

| Conceito | React | Angular |
|----------|-------|---------|
| **Estado Global** | Redux/Context + Hooks | `BehaviorSubject` (RxJS) |
| **Estado Local** | `useState()` | Signals (`signal()`, `computed()`) |
| **Ciclo de Vida** | `useEffect()` | `OnInit`, `OnDestroy`, etc. |
| **Validação de Formulários** | `formik`, `react-hook-form` | `ReactiveFormsModule` (FormBuilder) |
| **Comunicação entre Componentes** | Props + Callbacks | `@Input()` / `@Output()` (evento emitters) |
| **Reatividade** | Renderização automática | `ChangeDetectionStrategy.OnPush` |
| **Performance** | Memo, useMemo | Signals, OnPush + Async Pipe |
| **Roteamento** | `react-router` | `@angular/router` (nativo) |
| **HTTP** | `axios`, `fetch` | `HttpClient` (injeção de dependência) |
| **Middleware (HTTP)** | Interceptadores customizados | HttpClient Interceptors |
| **Autenticação de Rotas** | HOCs, Guards customizados | Route Guards (`CanActivate`) |
| **Pre-load de Dados** | Loaders em componentes | Resolvers (resolve na rota) |
| **Testing** | Jest, React Testing Library | Vitest + Angular TestBed |

##  O que Este Projeto Oferece

### 1. **Dashboard** (Signals Lab)
- Demonstra uso de **Signals** para estado local reativo
- Mostra `signal()` e `computed()`
- Painel de acesso para demonstrar guards

### 2. **Tela de Posts** (Tabela Reativa)
- Integração com **HttpClient** (JSONPlaceholder)
- **State Global com RxJS** (`BehaviorSubject`)
- Filtro local com **Signals**
- Carregamento via **Resolver**

### 3. **Tela de Usuários** (Com Guard)
- **Route Guard** (`canActivate`) que bloqueia acesso
- **Painel de controle de acesso** interativo
- Demonstra padrão **Chain of Responsibility**

### 4. **RxJS Lab** ⚡
Laboratório totalmente síncrono para estudar operadores avançados:
- **`switchMap`**: cancela requisições antigas quando termo muda
- **`exhaustMap`**: ignora cliques extras durante carregamento
- **`combineLatest`**: junta múltiplas fontes de dados

### 5. **Forms Lab** 
Comparação lado a lado de dois estilos:

**Reactive Forms (esquerda)**
```typescript
// Estilo funcional/programático (como em React com bibliotecas)
form = this.fb.group({
  email: ['', [Validators.required, Validators.email]]
});
```
- Mais testável
- Melhor para formas complexas
- Validação programática

**Template Forms (direita)**
```html
<!-- Estilo orientado por template (único do Angular) -->
<input [(ngModel)]="model.email" required email />
```
- Mais simples
- Menos código
- Melhor para formas simples

### 6. **Security Lab** 🔒
Aprenda a evitar **vulnerabilidades XSS** (Cross-Site Scripting):

```typescript
// ❌ PERIGOSO: Nunca faça isso com dados do usuário!
<div [innerHTML]="userInput"></div>

// ✅ SEGURO: Use interpolação (Angular sanitiza por padrão)
<p>{{ userInput }}</p>

// ⚠️ CUIDADO: Apenas com dados internos confiáveis
<div [innerHTML]="sanitizer.bypassSecurityTrustHtml(trustedHTML)"></div>

// ✅ MELHOR: Passe dados como @Input, não HTML strings
<app-child [data]="userInput"></app-child>
```

**Cenários Demonstrados:**
- Como Angular protege contra XSS automaticamente
- Por que `[innerHTML]` é perigoso com dados do usuário
- Quando (raramente) usar `bypassSecurityTrustHtml`
- Alternativas seguras com components

### 7. **Infraestrutura Angular**

**Interceptor HTTP**
```typescript
// "Middleware" automático em todas as requisições
// Adiciona headers, loga requisições, trata erros
```

**Guards & Resolvers**
```typescript
// Guard: bloqueia rota se condição não atender
// Resolver: carrega dados antes da navegação (melhor UX)
```

## 🛡️ Segurança Web com Angular

### XSS (Cross-Site Scripting) - Vulnerabilidade #1 da OWASP

Angular protege você **por padrão**, mas é essencial entender como:

#### ✅ O Angular Protege Você

```typescript
// ✓ SEGURO: Interpolação {{ }} é sanitizada automaticamente
<p>{{ userInput }}</p>  // Se userInput = '<img src=x onerror="alert()">'
                         // Resultado: <p>&lt;img src=x onerror="alert()"&gt;</p>

// ✓ SEGURO: Quando você passa dados via @Input/<ng-container
<app-child [data]="userInput"></app-child>

// ✓ SEGURO: Binding de atributos
<img [src]="imageUrl" [alt]="altText" />

// ✓ SEGURO: Binding de style/class
<div [style.color]="userColor"></div>
```

#### ❌ O que Evitar

```typescript
// ❌ PERIGOSO: innerHTML com dados do usuário
<div [innerHTML]="userInput"></div>  // Script malicioso SERÁ executado!

// ❌ PERIGOSO: URLs dinâmicas sem sanitização
<a [href]="userUrl"></a>  // Pode conter javascript:

// ❌ PERIGOSO: Eval ou Function() com dados do usuário
const fn = new Function(userCode);  // NUNCA FAÇA ISSO!
```

#### ⚠️ Usar com Cuidado

```typescript
// ⚠️ APENAS com conteúdo interno confiável (ex: Markdown renderizado)
import { DomSanitizer } from '@angular/platform-browser';

constructor(private sanitizer: DomSanitizer) {}

// Exemplo: editor que salva HTML confiável no backend
renderTrustedMarkdown(html: string) {
  return this.sanitizer.bypassSecurityTrustHtml(html);  // ⚠️ Cuidado!
}
```

### Resumo de Proteção

| Método | Proteção | Uso |
|--------|----------|-----|
| `{{ }}` Interpolação | ✅ Total | Sempre! |
| `@Input/@Output` | ✅ Total | Componentes |
| `[property]` Property Binding | ✅ Total | Atributos |
| `[innerHTML]` com usuário | ❌ Nenhuma | NUNCA |
| `bypassSecurityTrust*()` | ⚠️ Manual | Apenas dados internos |

### Melhores Práticas de Segurança

1. **Validação Backend**
   ```typescript
   // Sempre valide no servidor
   POST /api/posts
   Body: { content: userInput }  // Validar/sanitizar no backend!
   ```

2. **Content Security Policy (CSP)**
   ```nginx
   # Configure no servidor
   Content-Security-Policy: default-src 'self'; script-src 'self'
   X-Content-Type-Options: nosniff
   X-Frame-Options: DENY
   X-XSS-Protection: 1; mode=block
   ```

3. **Encode Dados Dinâmicos**
   ```typescript
   // Se precisar renderizar HTML (raro):
   // 1. Valide no backend
   // 2. Use DomSanitizer.sanitize() ou bypassSecurityTrustHtml()
   // 3. Teste extensivamente
   ```

4. **Mantenha Dependências Atualizadas**
   ```bash
   npm audit  # Verifique vulnerabilidades
   npm update  # Mantenha tudo atualizado
   ```

### OWASP Top 10 no Angular

| Risco | Angular Proteção | Sua Responsabilidade |
|-------|-----------------|----------------------|
| **A1: XSS** | ✅ Sanitização automática | Não use innerHTML com dados do usuário |
| **A2: CSRF** | ✅ CSRF token automático | HttpClient injeta `X-CSRF-TOKEN` |
| **A3: Injeção SQL** | ✅ Parameterizado backend | Nunca concatene queries |
| **A5: Acesso Quebrado** | ⚠️ Guards de rota | Implemente autenticação no backend |
| **A6: XEE/XXE** | ✅ Parser seguro | XML é raro em aplicações Angular |

###  Navegação no Projeto

1. **Dashboard** (📊) - Comece aqui para entender Signals
2. **Forms Lab** (🧾) - Compare Reactive vs Template Forms lado a lado
3. **Security Lab** (🔒) - Aprenda XSS e proteção (NOVO!)
4. **RxJS Lab** (🧪) - Estude operadores avançados
5. **Posts** (📄) - Veja estado global + HTTP + Tabela
6. **Usuários** (👥) - Aprenda Guards e Resolvers

##  Estrutura do Projeto

```
src/
├── app/
│   ├── core/
│   │   ├── interceptors/        # HTTP Interceptors (middleware)
│   │   ├── guards/              # Route Guards (autenticação, autorização)
│   │   ├── resolvers/           # Data Resolvers (pré-carregamento)
│   │   ├── services/            # Serviços reutilizáveis
│   │   └── components/          # Componentes globais (ex: painel de acesso)
│   ├── features/                # Organização por feature
│   │   ├── dashboard/
│   │   │   ├── pages/           # Page containers (orquestração)
│   │   │   └── components/      # Componentes de apresentação
│   │   ├── posts/
│   │   ├── users/
│   │   ├── forms-lab/
│   │   ├── rxjs-lab/
│   │   └── ...
│   ├── shared/                  # Componentes/serviços reutilizáveis
│   │   └── components/
│   ├── services/
│   │   ├── api.service.ts       # Encapsula chamadas HTTP
│   │   └── global-state.service.ts  # Estado global (RxJS)
│   └── app.routes.ts            # Configuração de rotas
└── ...
```

### Padrões de Arquitetura Utilizados

- **Facade**: `GlobalStateService` encapsula a complexidade do estado RxJS
- **Observer**: `BehaviorSubject` + `async` pipe aplicam padrão Observer
- **Singleton**: Serviços Angular são singletons por padrão
- **Composite**: Telas são compostas de subcomponentes menores
- **Chain of Responsibility**: Guards verificam condições em sequência

##  Como Rodar

### Pré-requisitos
```bash
Node.js 18+
npm 10+
```

### Instalação
```bash
npm install
```

### Desenvolvimento
```bash
npm start
# Abre em http://localhost:4200
```

### Testes
```bash
npm run test              # Modo watch
npm run test -- --watch=false  # Rodar uma vez (CI/CD)
```

### Build Produção
```bash
npm run build
# Saída em dist/
```

##  Conceitos-Chave Estudados

### Estado Management (como em React)

**React:**
```javascript
// useState (estado local)
const [count, setCount] = useState(0);

// Redux/Context (estado global)
const state = useSelector(selectState);
```

**Angular:**
```typescript
// Signals (estado local, substitui useState)
count = signal(0);

// RxJS BehaviorSubject (estado global, substitui Redux)
private stateSubject = new BehaviorSubject<State>({...});
state$ = this.stateSubject.asObservable();
```

### Reatividade

**React (automático):**
```javascript
// Todo re-render atualiza a tela automaticamente
const [user, setUser] = useState({});
```

**Angular (OnPush estratégico):**
```typescript
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush  // Manual, mais rápido
})
// Inputs e Observables disparam atualização
```

### Comunicação entre Componentes

**React:**
```javascript
<Child value={prop} onChange={handler} />
```

**Angular:**
```typescript
@Input() value: string;
@Output() change = new EventEmitter<string>();
```

## 📊 Estatísticas do Projeto

- **11+ Componentes** (page containers + apresentação)
- **42+ Testes Unitários** (com comentários explicativos)
- **2 Estilos de Forms** (Reactive e Template-driven lado a lado)
- **3 Operadores RxJS** avançados (switchMap, exhaustMap, combineLatest)
- **Padrões GoF** explicitamente documentados
- **Standalone Components** (arquitetura moderna do Angular 14+)
- **TypeScript Strict Mode** habilitado

## 🎓 Por que Este Projeto é Didático?

1. ✅ **Comentários em Comentários**: Cada padrão inclui explicação de por quê
2. ✅ **Exemplos Reais**: Não é "Hello World", integra com API pública
3. ✅ **Testes Comentados**: Cada teste explica o que está sendo validado
4. ✅ **Comparação com React**: Facilita transição de dev React para Angular
5. ✅ **Lado a Lado**: Reactive vs Template Forms na mesma página
6. ✅ **Laboratórios**: Testar comportamentos sem amarração em dados reais

## 🔗 Recursos Úteis

- [Angular Docs](https://angular.dev)
- [RxJS Docs](https://rxjs.dev)
- [JSONPlaceholder API](https://jsonplaceholder.typicode.com/) (dados fake para testes)
- [Angular Best Practices](https://angular.dev/guide/styleguide)

## Princípios S.O.L.I.D

Breve orientação prática para aplicar S.O.L.I.D em TypeScript/Angular:

- **Single Responsibility (S)**: cada classe/serviço deve ter uma única razão para mudar. Separe responsabilidades (ex: `ApiService` para acesso a dados; `PostsComponent` só para apresentação).

- **Open/Closed (O)**: aberto à extensão, fechado à modificação. Projete abstrações (interfaces) e estenda comportamento sem alterar código existente (use injection/estratégias).

- **Liskov Substitution (L)**: subtipos devem poder substituir seus supertypes sem quebrar o contrato. Evite métodos que lançam exceções inesperadas ou mudam contratos.

- **Interface Segregation (I)**: prefira interfaces pequenas e específicas a uma interface "gorda". Divida contratos em serviços menores (ex: `IUserFetcher`, `IUserUpdater`).

- **Dependency Inversion (D)**: dependa de abstrações, não de implementações concretas. Injete dependências via construtor e use tokens/interfaces para facilitar testes:

```typescript
// Exemplo simples
interface IApiService { get<T>(url: string): Observable<T> }
class PostsService {
   constructor(private api: IApiService) {}
   getPosts() { return this.api.get<Post[]>('/posts'); }
}
```

Dicas rápidas:
- Escreva testes unitários para cada responsabilidade separadamente.
- Refatore quando uma classe ganhar mais de uma razão para mudar.
- Use injeção de dependência para facilitar mocks e extensibilidade.


## 💡 Casos de Uso Aprendidos

Este projeto demonstra como construir:
- ✅ Aplicações com estado centralizado reativo
- ✅ Rotas protegidas com autenticação simulada
- ✅ Tabelas com filtro, paginação local e estado global
- ✅ Formulários complexos com validação
- ✅ Operações HTTP com tratamento de erro
- ✅ Comunicação entre componentes desacoplados
- ✅ Performance com OnPush + Signals

## 📝 Notas para Iniciantes

Se você vem do React:
- Angular é mais **opinionado** (tem um jeito "certo" de fazer as coisas)
- Menos "magia", mais **explícito** (injeção de dependência, decoradores)
- **TypeScript é obrigatório** (React usa JSX + TypeScript opcionalmente)
- RxJS é o "estado management nativo" (substitui Redux/Zustand)
- Signals são a novidade (tipo useState do React)

## 🏁 Conclusão

Este projeto é seu **playground para dominar Angular** com exemplos reais, testes e padrões profissionais. Estude cada tela, modifique o código, rode os testes e compare com React para consolidar o aprendizado.

**Bom estudo! 🚀**


```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
