
import React, { useState } from "react";
import { Search as SearchIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface Provider {
  id: number;
  name: string;
  specialty: string;
  experience: string;
  rating: number;
}

const mockProviders: Provider[] = [
  {
    id: 1,
    name: "Dr. Sarah Johnson",
    specialty: "General Medicine",
    experience: "10+ years",
    rating: 4.8,
  },
  {
    id: 2,
    name: "Dr. Michael Chen",
    specialty: "Pediatrics",
    experience: "8 years",
    rating: 4.7,
  },
  {
    id: 3,
    name: "Dr. Emily Williams",
    specialty: "Family Medicine",
    experience: "15+ years",
    rating: 4.9,
  },
];

const Search = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProviders, setFilteredProviders] = useState<Provider[]>(mockProviders);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    const filtered = mockProviders.filter(
      (provider) =>
        provider.name.toLowerCase().includes(query.toLowerCase()) ||
        provider.specialty.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredProviders(filtered);
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Find Healthcare Providers</h1>
      
      <div className="flex gap-4 mb-8">
        <div className="relative flex-1">
          <SearchIcon className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
          <Input
            type="text"
            placeholder="Search by name or specialty..."
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button>Search</Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredProviders.map((provider) => (
          <Card key={provider.id} className="card-hover">
            <CardHeader>
              <CardTitle>{provider.name}</CardTitle>
              <CardDescription>{provider.specialty}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p className="text-sm text-gray-600">
                  Experience: {provider.experience}
                </p>
                <p className="text-sm text-gray-600">
                  Rating: {provider.rating} / 5.0
                </p>
                <Button className="w-full mt-4">View Profile</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredProviders.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-600">No healthcare providers found matching your search.</p>
        </div>
      )}
    </div>
  );
};

export default Search;
