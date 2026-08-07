import { Link } from 'react-router-dom';

const iconBase = `${import.meta.env.BASE_URL}icons/`;

export default function ArchitectureDiagram() {
  return (
    <section className="content">
      <div className="project-page-links">
        <Link className="project-page-link" to="/">App</Link>
        <Link className="project-page-link" to="/story">Story</Link>
        <Link className="project-page-link active" to="/architecture-diagram">Visual Diagram</Link>
        <a className="project-page-link" href="/">Back to Portfolio</a>
      </div>

      <section className="story-panel">
        <p className="story-kicker">QuickBite System Diagram</p>
        <h2>Production architecture lanes</h2>
        <p>
          Full architecture view for delivery, authentication, API processing, order workflows, and data persistence.
        </p>
      </section>

      <section className="qb-arch-board" aria-label="QuickBite cloud architecture">
        <article className="qb-arch-lane">
          <p className="qb-arch-lane-title">Delivery and Frontend</p>
          <div className="qb-arch-grid">
            <div className="qb-arch-node blue"><img className="qb-arch-node-icon" src={`${iconBase}browser.svg`} alt="Browser" />Mobile Browser UI<small>React + Vite client routes</small></div>
            <div className="qb-arch-flow">→</div>
            <div className="qb-arch-node blue"><img className="qb-arch-node-icon" src={`${iconBase}cloudfront.svg`} alt="Amazon CloudFront" />CloudFront CDN<small>/quickbite global edge delivery</small></div>
            <div className="qb-arch-flow">→</div>
            <div className="qb-arch-node blue"><img className="qb-arch-node-icon" src={`${iconBase}s3.svg`} alt="Amazon S3" />S3 Static Hosting<small>bundled frontend assets</small></div>
          </div>
        </article>

        <article className="qb-arch-lane">
          <p className="qb-arch-lane-title">Auth and API Routing</p>
          <div className="qb-arch-grid">
            <div className="qb-arch-node purple"><img className="qb-arch-node-icon" src={`${iconBase}cognito.svg`} alt="Amazon Cognito" />Amazon Cognito<small>Hosted login + JWT session tokens</small></div>
            <div className="qb-arch-flow">→</div>
            <div className="qb-arch-node cyan"><img className="qb-arch-node-icon" src={`${iconBase}api-gateway.svg`} alt="Amazon API Gateway" />API Gateway HTTP API<small>orders, account, favorites endpoints</small></div>
            <div className="qb-arch-flow">→</div>
            <div className="qb-arch-node cyan"><img className="qb-arch-node-icon" src={`${iconBase}lambda.svg`} alt="AWS Lambda" />Lambda Handlers<small>validation and order business logic</small></div>
          </div>
        </article>

        <article className="qb-arch-lane">
          <p className="qb-arch-lane-title">Checkout and Persistence</p>
          <div className="qb-arch-grid">
            <div className="qb-arch-node green"><img className="qb-arch-node-icon" src={`${iconBase}shopping-cart.svg`} alt="Shopping Cart" />Order Workflow<small>cart to confirmation flow</small></div>
            <div className="qb-arch-flow">↔</div>
            <div className="qb-arch-node green"><img className="qb-arch-node-icon" src={`${iconBase}lambda.svg`} alt="AWS Lambda" />Lambda Runtime<small>writes and reads user-order data</small></div>
            <div className="qb-arch-flow">→</div>
            <div className="qb-arch-node green"><img className="qb-arch-node-icon" src={`${iconBase}dynamodb.svg`} alt="Amazon DynamoDB" />DynamoDB Tables<small>profiles, favorites, orders</small></div>
          </div>
        </article>

        <p className="qb-arch-note">Protected routes use Cognito bearer tokens. API Gateway and Lambda process requests while DynamoDB stores user-specific records for account and ordering flows.</p>
      </section>

      <section className="story-grid" style={{ marginTop: 14 }}>
        <article className="story-card">
          <h3>Delivery Layer</h3>
          <p>
            Frontend bundles are hosted on S3 and served through CloudFront for low-latency app delivery.
          </p>
        </article>
        <article className="story-card">
          <h3>Identity</h3>
          <p>
            Cognito secures sign-up/sign-in and gates account-protected routes with JWT bearer tokens.
          </p>
        </article>
        <article className="story-card">
          <h3>API + Compute</h3>
          <p>
            API Gateway routes requests to Lambda handlers that manage order placement and user action validation.
          </p>
        </article>
        <article className="story-card">
          <h3>Persistence</h3>
          <p>
            DynamoDB stores order records and user data required by Orders, Favorites, and Account pages.
          </p>
        </article>
      </section>
    </section>
  );
}
