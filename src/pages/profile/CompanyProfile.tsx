
import { useState } from "react";
import { Building2, Mail, Phone, MapPin, Users } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import Reviews from "../reviews/Reviews";
import { useParams } from "react-router-dom";

// Mock data - replace with real data when backend is integrated
const initialProfile = {
  name: "TechCare Solutions",
  email: "contact@techcare.com",
  phone: "(555) 123-4567",
  address: "123 Business Ave, San Francisco, CA 94105",
  employeeCount: "50-100",
  description: "Leading healthcare staffing solutions provider with 10+ years of experience.",
};

const CompanyProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState(initialProfile);
  const { toast } = useToast();
  const { id } = useParams();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Integrate with backend to save changes
    setIsEditing(false);
    toast({
      title: "Profile updated",
      description: "Your company profile has been successfully updated.",
    });
  };

  return (
    <div className="container mx-auto p-6 max-w-3xl">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Company Profile</h1>
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
            <Building2 className="h-12 w-12 text-primary" />
            <div>
              <h2 className="text-2xl font-semibold">{profile.name}</h2>
              <p className="text-gray-600">Company Profile</p>
            </div>
          </div>

          <div className="grid gap-6 mt-6">
            <div className="space-y-2">
              <label className="text-sm font-medium">Company Name</label>
              <div className="relative">
                <Building2 className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
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
              <label className="text-sm font-medium">Employee Count</label>
              <div className="relative">
                <Users className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                <Input
                  value={profile.employeeCount}
                  onChange={(e) => setProfile({ ...profile, employeeCount: e.target.value })}
                  disabled={!isEditing}
                  className="pl-10"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Company Description</label>
              <Textarea
                value={profile.description}
                onChange={(e) => setProfile({ ...profile, description: e.target.value })}
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

      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-6">Reviews & Feedback</h2>
        {id && <Reviews userId={id} />}
      </div>
    </div>
  );
};

export default CompanyProfile;
