
import { useState } from "react";
import { User, Mail, Phone, Stethoscope, Award, Building2, MapPin } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

// Mock data - replace with real data when backend is integrated
const initialProfile = {
  name: "Dr. Sarah Johnson",
  email: "sarah.johnson@email.com",
  phone: "(555) 987-6543",
  specialization: "General Medicine",
  experience: "10+ years",
  license: "MD123456",
  practice: "City Medical Center",
  address: "456 Healthcare Blvd, San Francisco, CA 94105",
  bio: "Board-certified physician with extensive experience in general medicine and primary care.",
};

const ProviderProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState(initialProfile);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Integrate with backend to save changes
    setIsEditing(false);
    toast({
      title: "Profile updated",
      description: "Your healthcare provider profile has been successfully updated.",
    });
  };

  return (
    <div className="container mx-auto p-6 max-w-3xl">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Healthcare Provider Profile</h1>
        <Button
          variant={isEditing ? "outline" : "default"}
          onClick={() => setIsEditing(!isEditing)}
        >
          {isEditing ? "Cancel" : "Edit Profile"}
        </Button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          <div className="flex items-center space-x-4">
            <User className="h-12 w-12 text-primary" />
            <div>
              <h2 className="text-2xl font-semibold">{profile.name}</h2>
              <p className="text-gray-600">{profile.specialization}</p>
            </div>
          </div>

          <div className="grid gap-6 mt-6">
            <div className="space-y-2">
              <label className="text-sm font-medium">Full Name</label>
              <div className="relative">
                <User className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                <Input
                  value={profile.name}
                  onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                  disabled={!isEditing}
                  className="pl-10"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                <Input
                  type="email"
                  value={profile.email}
                  onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                  disabled={!isEditing}
                  className="pl-10"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Phone</label>
              <div className="relative">
                <Phone className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                <Input
                  type="tel"
                  value={profile.phone}
                  onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                  disabled={!isEditing}
                  className="pl-10"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Specialization</label>
              <div className="relative">
                <Stethoscope className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                <Input
                  value={profile.specialization}
                  onChange={(e) => setProfile({ ...profile, specialization: e.target.value })}
                  disabled={!isEditing}
                  className="pl-10"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">License Number</label>
              <div className="relative">
                <Award className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                <Input
                  value={profile.license}
                  onChange={(e) => setProfile({ ...profile, license: e.target.value })}
                  disabled={!isEditing}
                  className="pl-10"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Practice Name</label>
              <div className="relative">
                <Building2 className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                <Input
                  value={profile.practice}
                  onChange={(e) => setProfile({ ...profile, practice: e.target.value })}
                  disabled={!isEditing}
                  className="pl-10"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Address</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                <Input
                  value={profile.address}
                  onChange={(e) => setProfile({ ...profile, address: e.target.value })}
                  disabled={!isEditing}
                  className="pl-10"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Professional Bio</label>
              <Textarea
                value={profile.bio}
                onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                disabled={!isEditing}
                className="min-h-[100px]"
              />
            </div>
          </div>
        </div>

        {isEditing && (
          <Button type="submit" className="w-full">
            Save Changes
          </Button>
        )}
      </form>
    </div>
  );
};

export default ProviderProfile;
