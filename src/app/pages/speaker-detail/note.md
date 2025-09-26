ionic serve

ionic build --prod

genererate service with angular cli usin official naming conventions
ng g s services/housing --skip-tests --type=service --dry-run

ng g c detail --skip-tests --type=component --dry-run

ng g c oreder-pizza --skip-tests --type=component --dry-run

ng g s core/services/order --skip-tests --type=service --dry-run
CREATE src/app/services/order.service.ts (124 bytes)
export class OrderService
order.service.ts

ng g c oreder-pizza --skip-tests --type=component --dry-run

ng g c features/oreder-pizza --skip-tests --type=component --dry-run

ng g c features/menu --skip-tests --type=component --dry-run
src/app/
core/
services/
models/
features/
home/
home.component.ts
home.component.html
home.component.scss
booking/
booking-tabs.component.ts
booking-tabs.component.html
menu/
menu.component.ts
menu.component.html
shared/
components/
footer/
footer.component.ts
footer.component.html

ionic serve -- --proxy-config proxy.conf.json

ng g c features/booking/pages/booking-tabs --skip-tests --type=component --dry-run

ng g c features/booking/pages/order-menu --type=component --dry-run

ng g c features/booking/pages/order-table --type=component --dry-run

ng g c features/home-page -- type=component --dry-run
ng g c features/auth/login -- type=component --dry-run

ng g c pages/reservations/add-reservation --type=component --dry-run
ng g c pages/reservations --type=component --dry-run
reservations

ng g c shared/components/navbar --type=component --dry-run

ng g c features/auth--type=component

ng g s core/services/auth --skip-tests --type=service --dry-run

[text](tsconfig.spec.json)
[text](src/app/features/pages)

Struttura dei file proposta
/project-root
│
├─ /config
│ └─ db.js # Pool MySQL / Connessione
│
├─ /controllers
│ ├─ orderController.js
│ ├─ orderItemController.js
│ └─ authController.js
│
├─ /services
│ ├─ orderService.js # Logica business ordini
│ ├─ userService.js
│ └─ productService.js
│
├─ /models
│ ├─ order.js
│ ├─ orderItem.js
│ ├─ orderItemIngredient.js
│ ├─ user.js
│ └─ product.js
│
├─ /routes
│ ├─ orders.js
│ ├─ orderItems.js
│ └─ auth.js
│
├─ /middlewares
│ ├─ authMiddleware.js # JWT + ruoli
│ ├─ loggerMiddleware.js # Logging Winston
│ └─ validation.js # Validazione input Joi
│
├─ /utils
│ └─ logger.js # Winston setup
│
├─ /logs
│ └─ ... # File log giornalieri
│
├─ server.js
└─ package.json

Passaggi di funzionamento principali

Client scansiona QR → /api/v1/orders → crea ordine guest con token.

Aggiunta prodotti/ingredienti → /api/v1/order_items → loggato per audit.

Registrazione / Login → /api/v1/auth → JWT rilasciato.

Conversione ordine guest → utente registrato → /api/v1/orders/convert.

Logging e audit → tutte le azioni salvate su file rotanti e console.
