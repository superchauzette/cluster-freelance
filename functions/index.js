// Pour Autorizer gamil à envoi des emails
// https://www.google.com/settings/security/lesssecureapps
const functions = require("firebase-functions");
const nodemailer = require("nodemailer");

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
  sendEmail({
    msg: `
    <p>${post.msg}</p>
    <p>techno : ${post.techno}</p>
    <p>Envoyé par ${post.freelance.name} ${post.freelance.lastname}</p>
    `
  });
});

function sendEmail({ to = "", msg }, onSend = () => {}) {
  nodemailer.createTestAccount(err => {
    if (err) console.log(err);

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: getAuth()
    });

    const mailOptions = {
      from: '"Cluster Freelance 👻" <cluster.freelance@gmail.com>', // sender address
      to: `kevin.tillot@gmail.com,cluster.freelance@gmail.com,${to}`, // list of receivers
      subject: "Cluster Freelance ✔", // Subject line
      html: `<h1>Hello Cluster Freelance</h1> ${msg}` // html body
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return console.log(error);
      }
      onSend("Message sent");
      return console.log("Message sent", info);
    });
  });
}
