export function initialize(container, app) {
  app.deferReadiness();
  container.lookup("service:db").load().then(() => {
    app.advanceReadiness();
  });
}

export default {
  name: 'db',
  initialize: initialize
};
