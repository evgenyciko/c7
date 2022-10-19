const messages = {
    200: "sukses",
    201: "data berhasil disimpan",
  };
  function successResponse(res, code, data, meta = {}) {
    res.status(code).json({
      data: data,
      meta: {
        code: code,
        message: messages[code.toString()],
        ...meta,
      },
    });
  }
  
  module.exports = { successResponse };
  