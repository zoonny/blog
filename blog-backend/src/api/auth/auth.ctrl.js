const { ADMIN_PASS: adminPass } = process.env;

exports.login = (ctx) => {
  const { password } = ctx.request.body;
  if (adminPass == password) {
    ctx.body = {
      success: true,
    };
    // 로그인에 성공하면 logged 값을 true로 설정
    ctx.session.logged = true;
  } else {
    ctx.body = {
      success: false,
    };
    ctx.status = 401;
  }
};

exports.check = (ctx) => {
  ctx.body = {
    // ! 문자를 두번 입력하여 값이 존재 하지 않는 경우에도 false 반환
    logged: !!ctx.session.logged,
  };
};

exports.logout = (ctx) => {
  ctx.session = null;
  ctx.status = 204; // No Contents
};
