import { Link } from 'react-router-dom';

export default function Story() {
  return (
    <section className="content">
      <div className="project-page-links">
        <Link className="project-page-link" to="/">App</Link>
        <Link className="project-page-link active" to="/story">Story</Link>
        <Link className="project-page-link" to="/architecture-diagram">Visual Diagram</Link>
      </div>

      <section className="story-panel">
        <p className="story-kicker">QuickBite Build Story</p>
        <h2>From mobile-style UX to cloud-backed ordering</h2>
        <p>
          QuickBite was built as a full-stack portfolio app focused on realistic food-ordering flows:
          discover restaurants, authenticate users, manage cart state, and complete server-backed orders.
        </p>
      </section>

      <section className="story-grid">
        <article className="story-card">
          <h3>Challenge</h3>
          <p>
            Create a polished mobile-first app that feels fast on the frontend while handling authenticated
            data and transactional order workflows in the cloud.
          </p>
        </article>

        <article className="story-card">
          <h3>Approach</h3>
          <p>
            Use React Router for app flow, Cognito for auth, API Gateway + Lambda for order processing,
            and DynamoDB for restaurant and order data persistence.
          </p>
        </article>

        <article className="story-card">
          <h3>Product Focus</h3>
          <p>
            Prioritize key delivery-app moments: search, category filtering, restaurant detail, cart math,
            order confirmation, and account/order history pages.
          </p>
        </article>

        <article className="story-card">
          <h3>Outcome</h3>
          <p>
            A deployable cloud app that demonstrates practical full-stack implementation, secure user
            access, and a clean UX users can understand immediately.
          </p>
        </article>
      </section>
    </section>
  );
}
