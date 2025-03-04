
import emailjs from '@emailjs/browser';

type EmailTemplateParams = Record<string, unknown> & {
  to_email: string;
  to_name: string;
  verification_url?: string;
};

export const sendVerificationEmail = async (params: EmailTemplateParams) => {
  try {
    const response = await emailjs.send(
      import.meta.env.VITE_EMAILJS_SERVICE_ID,
      import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
      params as Record<string, unknown>,
      import.meta.env.VITE_EMAILJS_PUBLIC_KEY
    );
    return { success: true, response };
  } catch (error) {
    console.error('Error sending email:', error);
    return { success: false, error };
  }
};
