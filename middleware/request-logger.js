export default function (req, res, next) {
  console.log(`Handling request for ${req.url}`);
  next();
}
