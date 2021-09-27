//アドレスの日本語入力チェック
const jpCheck = (Email) => {
    const regexEmail = /[亜-熙ぁ-んァ-ヶ]/;
    return regexEmail.test(Email);
};

//アドレス,パスワードの空文字チェック
const blankCheck = (props) => {
    const regexEmail = /[^\s　]/;
    return !regexEmail.test(props);
};

//アドレスの形式チェック('英数字' + @ + '英数字' + . + '英数字'の形式のみ可)
const checkEmailFormat = (Email) => {
    const regexEmail = /^[a-zA-Z0-9_+-]+(.[a-zA-Z0-9_+-]+)*@([a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]*\.)+[a-zA-Z]{2,}$/;
    return !regexEmail.test(Email);
};

export {jpCheck,blankCheck,checkEmailFormat,};