import { injectable } from "tsyringe";
import * as nodemailer from 'nodemailer';
import { Product } from "../models/Product";

@injectable()
export class NotificationService {
    private transporter: nodemailer.Transporter;
    private adminEmail: string | undefined;

    constructor() {
        this.adminEmail = process.env.ADMIN_EMAIL;
        if (!this.adminEmail) {
            console.warn("L'adresse e-mail de l'administrateur n'est pas configurée dans le fichier .env.");
        }

        this.transporter = nodemailer.createTransport({
            host: process.env.MAILTRAP_HOST,
            port: Number(process.env.MAILTRAP_PORT) || 2525,
            auth: {
                user: process.env.MAILTRAP_USER,
                pass: process.env.MAILTRAP_PASS,
            },
        });
    }

    async sendLowStockEmail(product: Product): Promise<void> {
        if (!this.adminEmail) {
            console.warn("Impossible d'envoyer l'e-mail : adresse de l'administrateur non configurée.");
            return;
        }

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: this.adminEmail,
            subject: `Alerte de stock faible : ${product.getName()}`,
            html: `<p>Le produit <b>${product.getName()}</b> a atteint un seuil critique de stock (${product.getQuantity()} unités restantes).</p>`,
        };

        try {
            const info = await this.transporter.sendMail(mailOptions);
            console.log('E-mail de stock faible envoyé:', info.messageId);
        } catch (error) {
            console.error('Erreur lors de l\'envoi de l\'e-mail:', error);
        }
    }
}