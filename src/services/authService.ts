
import { supabase } from "@/integrations/supabase/client";
import { sendPasswordResetEmail, sendVerificationEmail } from "./emailjs";

export const requestPasswordReset = async (email: string) => {
  try {
    const { data: user } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });
    
    if (user) {
      await sendPasswordResetEmail({
        to_email: email,
        to_name: email,
        reset_password_url: `${window.location.origin}/reset-password`,
      });
    }
    
    return { success: true };
  } catch (error) {
    console.error('Error requesting password reset:', error);
    return { success: false, error };
  }
};

export const updatePassword = async (newPassword: string) => {
  try {
    const { error } = await supabase.auth.updateUser({
      password: newPassword,
    });

    if (error) throw error;
    return { success: true };
  } catch (error) {
    console.error('Error updating password:', error);
    return { success: false, error };
  }
};

export const verifyEmail = async (email: string, firstName: string, lastName: string) => {
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password: Math.random().toString(36).slice(-8), // Temporary password
      options: {
        data: {
          first_name: firstName,
          last_name: lastName,
        },
      },
    });

    if (error) throw error;

    if (data.user) {
      await sendVerificationEmail({
        to_email: email,
        to_name: `${firstName} ${lastName}`,
        verification_url: `${window.location.origin}/verify?token=${data.user.confirmation_sent_at}`,
      });
    }

    return { success: true };
  } catch (error) {
    console.error('Error during email verification:', error);
    return { success: false, error };
  }
};

export const deleteAccount = async () => {
  try {
    const user = (await supabase.auth.getUser()).data.user;
    if (!user) throw new Error('No user found');

    const { error } = await supabase.auth.admin.deleteUser(user.id);
    if (error) throw error;

    return { success: true };
  } catch (error) {
    console.error('Error deleting account:', error);
    return { success: false, error };
  }
};
