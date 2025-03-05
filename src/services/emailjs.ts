
import emailjs from '@emailjs/browser';

type EmailTemplateParams = {
  to_email: string;
  to_name: string;
  verification_url?: string;
  reset_password_url?: string;
};

export const sendVerificationEmail = async (params: EmailTemplateParams) => {
  try {
    const response = await emailjs.send(
      import.meta.env.VITE_EMAILJS_SERVICE_ID,
      import.meta.env.VITE_EMAILJS_VERIFICATION_TEMPLATE_ID,
      params,
      import.meta.env.VITE_EMAILJS_PUBLIC_KEY
    );
    return { success: true, response };
  } catch (error) {
    console.error('Error sending verification email:', error);
    return { success: false, error };
  }
};

export const sendPasswordResetEmail = async (params: EmailTemplateParams) => {
  try {
    const response = await emailjs.send(
      import.meta.env.VITE_EMAILJS_SERVICE_ID,
      import.meta.env.VITE_EMAILJS_RESET_TEMPLATE_ID,
      params,
      import.meta.env.VITE_EMAILJS_PUBLIC_KEY
    );
    return { success: true, response };
  } catch (error) {
    console.error('Error sending password reset email:', error);
    return { success: false, error };
  }
};
