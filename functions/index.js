// Pour Autorizer gamil à envoi des emails
// https://www.google.com/settings/security/lesssecureapps
const functions = require("firebase-functions");
const admin = require("firebase-admin");
const nodemailer = require("nodemailer");

admin.initializeApp(functions.config().firebase);
const db = admin.firestore();

// SET congig key : firebase functions:config:set auth.user=myvalue
const getAuth = () => ({
  user: functions.config().auth.user || "cluster.freelance@gmail.com",
  pass: functions.config().auth.pass
});

exports.sendEmail = functions.https.onRequest((req, res) => {
  sendEmail({ msg: `hello` }, msg => res.send(msg));
});

exports.sendEmailByPosts = functions.firestore.document("posts/{postId}").onCreate((snap, context) => {
  const post = snap.data();
  db.collection("freelances")
    .where("disponible", "==", true)
    .get()
    .then(extractData)
    .then(freelances => {
      console.log(freelances);

      sendEmail({
        msg: `
        <p>${post.msg}</p>
        <p>techno : ${post.techno}</p>
        <p>Envoyé par ${post.freelance.name} ${post.freelance.lastname}</p>
        `,
        to: freelances.map(f => f.email).join(",")
      });
      return "Send OK";
    })
    .catch(err => console.log(err));
});

function sendEmail({ to = "", msg }, onDone = () => {}) {
  nodemailer.createTestAccount(err => {
    if (err) {
      console.log(err);
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: getAuth()
    });

    const mailOptions = {
      from: '"Cluster Freelance 👻" <cluster.freelance@gmail.com>', // sender address
      to: `cluster.freelance@gmail.com,${to}`, // list of receivers
      subject: "Cluster Freelance ✔", // Subject line
      html: `<h1>Hello Cluster Freelance</h1> ${msg}` // html body
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return console.log(error);
      }
      onDone("Message sent");
      return console.log("Message sent", info);
    });
  });
}

function extractData(querySnapshot) {
  let d = [];
  querySnapshot.forEach(doc => {
    d.push(Object.assign({}, doc.data(), { id: doc.id }));
  });
  return d;
}
