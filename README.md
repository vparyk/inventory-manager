# Nuxt Minimal Starter

## State Management

The project’s state management is handled inside a dedicated composable, separated from the components.
My goal was to keep the logic reusable, easy to test, and independent from the component layer.
I didn’t use Nuxt’s useState as a global store since it didn’t feel necessary for a project of this size.

While I did consider using Pinia or a Redux-style store, that approach felt like overengineering for this small project, especially since the task description suggested keeping things simple.
At this scale, the composable-based approach is much simpler and easier to follow, while Vue 3’s reactivity system still provides great performance and clean, readable code.

That said, only a bit more functionality would make Pinia a good fit.
From my previous experience, Pinia requires much less boilerplate compared to Vuex,
and it helps avoid prop drilling while keeping data flow clean and predictable between components.

## Data Synchronization and Polling

The current data synchronization is implemented using a polling-based mechanism.
While a WebSocket-based solution would be more efficient, keeping data in real-time sync and reducing the chance of conflicts,
I chose polling because:

- It’s simpler to implement,

- Provides more predictable testing scenarios (e.g., for conflict or last-sync features),

- And the main focus of the project was conflict handling and state visualization.

- In this context, polling was a deliberate trade-off that served the project goals well.

## Conflict Handling

The system currently uses a "server wins" strategy for handling conflicts.
Given the available time and scope, this was the most stable and maintainable approach.

The UI provides clear visual feedback and a tooltip when a conflict occurs,
along with a temporary lock so users can notice and understand what happened.

A natural next step for future development would be an interactive conflict resolution interface,
allowing users to choose between “client wins” or "server wins" options.

## Error handling

I added strict validation between the backend and the frontend for all data being transferred.
Any received errors are displayed clearly in the UI.

When the user goes offline, a visible indicator is shown, and all actions made during offline mode are stored in a generic, reusable event queue.
This queue automatically resends those actions once the connection is restored.

Errors are also communicated to the user, not only through red borders and tooltip icons, but also via toast messages for extra visibility.

## Possible Future Improvements

- Extended filtering: add an option to filter by “Saved” status.

- WebSocket integration: enable real-time updates and reduce conflicts.

- Conflict resolution UI: let users manually resolve conflicts.

- State persistence: store local states (queued, saved) in browser cache or IndexedDB.

- Add retry logic for failed API calls (e.g. retry X times before giving up).

- Strengthen input validation on the frontend to prevent edge case errors before sending requests.

- When implementing a conflict resolution prompt, modify the current handling so the conflict state stays active until the user resolves it, even if new data arrives from the server.

- If keeping the current “server wins” approach, it would be a good idea to cancel backend requests immediately when new data arrives from polling, since the conflict can already be detected safely on the frontend.

## Setup

Make sure to install dependencies:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm dev

# yarn
yarn dev

# bun
bun run dev
```

## Production

Build the application for production:

```bash
# npm
npm run build

# pnpm
pnpm build

# yarn
yarn build

# bun
bun run build
```

Locally preview production build:

```bash
# npm
npm run preview

# pnpm
pnpm preview

# yarn
yarn preview

# bun
bun run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.
