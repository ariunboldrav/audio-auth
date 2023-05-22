const ErrorHandler = (errors = []) => {
  const errMsg = {}
  errors.map((item) => {
    var key = item.property
    var messages = []
    for (const [key, value] of Object.entries(item.constraints)) {
      messages.push(value)
    }
    const n = { [key]: messages }
    Object.assign(errMsg, n)
  })
  return errMsg
};

export default ErrorHandler;
