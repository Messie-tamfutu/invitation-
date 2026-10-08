document.getElementById('invitationForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const prenom = document.getElementById('prenom').value.trim();
    const nom = document.getElementById('nom').value.trim();
    const email = document.getElementById('email').value.trim();
    const telephone = document.getElementById('telephone').value.trim();
    const relation = document.getElementById('relation').value;

    const mariageNom = "Messie Tamfutu & Christine";
    const mariageDate = "15 décembre 2026";
    const mariageLieu = "Kinshasa, DRC";

    let messageRelation = "";

    switch (relation) {
        case 'ami':
            messageRelation = "C’est avec une grande joie que nous t’invitons à célébrer notre mariage.";
            break;
        case 'famille':
            messageRelation = "En tant que membre de la famille, ta présence à notre mariage nous ferait un immense plaisir.";
            break;
        case 'connaissance':
            messageRelation = "Nous serions honorés de ta présence à notre mariage.";
            break;
        default:
            messageRelation = "Nous avons le plaisir de t’inviter à notre mariage.";
    }

    // Créer un conteneur QR code temporaire invisible dans la page
    const tempDiv = document.createElement('div');
    tempDiv.style.position = "absolute";
    tempDiv.style.left = "-9999px";
    document.body.appendChild(tempDiv);

    // URL personnalisée pour vérifier l'invitation (ici on simule avec une URL simple + nom+prenom)
    const verificationUrl = `https://tonsite.com/verification?nom=${encodeURIComponent(nom)}&prenom=${encodeURIComponent(prenom)}`;

    // Génération du QR code
    new QRCode(tempDiv, {
        text: verificationUrl,
        width: 150,
        height: 150,
        correctLevel: QRCode.CorrectLevel.H
    });

    // Après un court délai pour générer le QR, on récupère l'image en base64
    setTimeout(() => {
        const img = tempDiv.querySelector('img');
        const qrDataUrl = img ? img.src : null;

        document.body.removeChild(tempDiv);

        // Image décorative de fond
        const imageUrl = "https://www.publicdomainpictures.net/pictures/320000/velka/wedding-flowers-background.jpg";

        const invitationHTML = `
<!DOCTYPE html>
<html lang="fr">
<head>
<meta charset="UTF-8">
<title>Invitation de Mariage</title>
<style>
    body {
        font-family: 'Georgia', serif;
        background: url('${imageUrl}') no-repeat center center fixed;
        background-size: cover;
        color: #42291a;
        padding: 40px;
        text-align: center;
    }
    .invitation-box {
        background-color: rgba(255, 248, 240, 0.85);
        max-width: 700px;
        margin: auto;
        padding: 30px;
        border-radius: 15px;
        box-shadow: 0 3px 15px rgba(0,0,0,0.3);
    }
    h1 {
        font-size: 36px;
        color: #a05a2d;
        margin-bottom: 5px;
    }
    h3 {
        font-weight: normal;
        margin-top: 0;
        margin-bottom: 25px;
        font-style: italic;
        color: #7a4a2f;
    }
    p {
        font-size: 18px;
        line-height: 1.6;
    }
    .footer {
        margin-top: 30px;
        font-size: 14px;
        color: #8b6a4f;
    }
    .qr-code {
        margin-top: 30px;
    }
</style>
</head>
<body>
    <div class="invitation-box">
        <h1>${mariageNom}</h1>
        <h3>Invitation de Mariage</h3>
        <p>Cher(e) <strong>${prenom} ${nom}</strong>,</p>
        <p>${messageRelation}</p>
        <p><strong>Date :</strong> ${mariageDate}<br>
           <strong>Lieu :</strong> ${mariageLieu}</p>
        <p>Merci de confirmer votre présence.</p>
        <p><strong>Coordonnées enregistrées :</strong><br>
           Email : ${email}<br>
           Téléphone : ${telephone}</p>

        <div class="qr-code">
            <p><strong>Vérifiez votre invitation :</strong></p>
            <img src="${qrDataUrl}" alt="QR Code de vérification">
        </div>

        <div class="footer">Avec tout notre amour, <br> Messie Tamfutu & Christine</div>
    </div>
</body>
</html>`;

        const blob = new Blob([invitationHTML], { type: 'text/html' });
        const url = URL.createObjectURL(blob);
        const downloadLink = document.createElement('a');
        downloadLink.href = url;
        downloadLink.download = `invitation_${prenom}_${nom}.html`;
        downloadLink.textContent = "Télécharger votre invitation HTML avec QR code ici";
        downloadLink.style.display = 'block';
        downloadLink.style.marginTop = '20px';

        const messageDiv = document.getElementById('message');
        messageDiv.innerHTML = `<p>Votre invitation HTML a été créée avec succès !</p>`;
        messageDiv.appendChild(downloadLink);

    }, 300); // délai pour la génération du QR code
});
