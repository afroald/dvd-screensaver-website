export default function (req, res, next) {
  // eslint-disable-next-line no-console
  console.log(`Handling request for ${req.url}`);
  next();
}
