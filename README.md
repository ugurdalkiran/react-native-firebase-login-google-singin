# React Native - Firebase Login - Google SingIn

İki farklı şekilde Firebase'e giriş yapmayı sağlayan küçük bir uygulama. Birinci yöntem e-posta ve şifre ile kayıt olduktan sonra normal giriş yapılabilen kısım. İkinci yöntem ise, Google hesabı ile otomatik giriş yapılabilen kısım.

Giriş yapıldıktan sonra kişinin ismini, e-posta adresini, profil fotoğrafını ve benzersiz kullanıcı ID bilgisini farklı bir sayfada göstermektedir.

Kişi ismini ve profil fotoğrafını güncelleyebilir.

Profil fotoğrafı güncelleme işlemi için kameradan veya galeriden seçilen fotoğraf önce **Firebase Storage** saklama alanına yükleniyor. Ardından profil fotoğrafı, saklanan fotoğrafın indirilebilir URL bağlantısı ile güncelliyor.

## Uygulama Dosyaları

Uygulamanın son halini **APK** olarak [buradan](https://github.com/ugurdalkiran/react-native-firebase-login-google-singin/blob/master/fir2.apk?raw=true) indirebilirsiniz.

Uygulamanın tüm kaynak kodlarını ise **FTP** üzerinden [buraya](https://we.tl/t-adzAe8iSrc) tıklayarak indirebilirsiniz.

## Kullanılan Paketler

* react-native-firebase
* react-native-google-signin
* react-native-image-picker

## Uygulama Genel Görseller (1/2)

![PNG](https://github.com/ugurdalkiran/react-native-firebase-login-google-singin/blob/master/image1.png)

## Uygulama Fotoğraf Yükleme Görselleri (2/2)

![PNG](https://github.com/ugurdalkiran/react-native-firebase-login-google-singin/blob/master/image2.png)

## Çalışmadan Elde Edilen Bilgiler

**Firebase Auth** ve **Firebase Storage** paketlerini aynı çalışmada kullanmam gerekiyordu. Android için *android/app/build.gradle* dosyasına alt alta eklemeye çalıştığımda hata ile karşılaştım.

```gradle
implementation "com.google.firebase:firebase-auth:17.0.0"
implementation "com.google.firebase:firebase-storage:17.0.0"
```

Bunun yerine grup olarak eklediğimde artık hatadan kurtulmuştum.

```gradle
implementation( project(':react-native-firebase') ){
    implementation "com.google.firebase:firebase-auth:17.0.0"
    implementation "com.google.firebase:firebase-storage:17.0.0"
}
```

## Kısa Kodlar

Uygulama boyunca kilit noktalarda kullanılan fonksiyonları aşağıdan inceleyebilirsiniz.

### 1. Firebase Mevcut Kullanıcı

```js
const user = firebase.auth().currentUser;
```

### 2. Google ile Giriş

```js
GoogleSignin.signIn().then((data) => {

	const credential = firebase.auth.GoogleAuthProvider.credential(data.idToken, data.accessToken);

	firebase.auth().signInWithCredential(credential)
	.then(success)
	.catch(failure);

}).catch(failure);
```

### 3. Firebase ile Giriş

```js
firebase.auth().signInWithEmailAndPassword(email, password)
.then(success)
.catch(failure);
```

### 4. Firebase Kullanıcı Oluşturma

```js
firebase.auth().createUserWithEmailAndPassword(email, password)
.then(success)
.catch(failure);
```

### 5. Firebase Fotoğraf Yükleme
```js
firebase.storage().ref(fileName).putFile(path)
.then(success)
.catch(failure);
```

### 6. Firebase Fotoğraf Bağlantısını Alma
```js
const ref = firebase.storage().ref(fileName);

ref.getDownloadURL()
.then(success)
.catch(failure);
```

### 8. Firebase Kullanıcı Güncelleme
```js
const user = firebase.auth().currentUser;

user.updateProfile({

	photoURL: url

})
.then(success)
.catch(failure);
```
