export function errorResolve(code) {
    switch (code) {
        case "auth/weak-password":
            return "Parola geçersiz. Lütfen en az 6 karaktedli bir parola kullanın."
            
        case "auth/email-already-in-use":
            return "Bu mail adresi ile bağlantılı bir hesap bulduk."
        
        case "auth/wrong-password":
            return "Parola geçersiz veya kullanıcının parolası yok"

        case "auth/invalid-email":
            return "Uygun yapıda bir e-posta adresi giriniz. Örn:yardim@ogrencievi.com"

        case "auth/user-not-found":
            return "Bu email'e karşılık gelen kullanıcı kaydı yok."
     
        default:
            return "Mail adresi ile bağlantılı bir hesap olabilir. Giriş yapmayı deneyiniz."
    }
}