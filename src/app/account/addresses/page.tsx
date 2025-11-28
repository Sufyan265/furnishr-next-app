'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { PlusCircle, MapPin, Home, Edit, Trash2 } from 'lucide-react';

const addresses = [
    {
        id: 1,
        type: 'Home',
        address: '123 Design Street, London, EC1V 9DD, United Kingdom',
        isDefault: true,
    },
    {
        id: 2,
        type: 'Work',
        address: '456 Business Avenue, Manchester, M1 1AA, United Kingdom',
        isDefault: false,
    },
];

export default function SavedAddressesPage() {
    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <div>
                    <CardTitle className="font-headline text-2xl">Saved Addresses</CardTitle>
                    <CardDescription>Manage your shipping addresses.</CardDescription>
                </div>
                <Button>
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Add New Address
                </Button>
            </CardHeader>
            <CardContent className="space-y-6">
                {addresses.map((addr) => (
                    <div key={addr.id} className="border p-4 rounded-lg flex items-start justify-between">
                        <div className="flex items-start gap-4">
                            <MapPin className="h-6 w-6 text-primary mt-1" />
                            <div>
                                <div className="flex items-center gap-2">
                                    <h3 className="font-semibold">{addr.type}</h3>
                                    {addr.isDefault && (
                                        <span className="text-xs font-medium bg-primary text-primary-foreground px-2 py-0.5 rounded-full">Default</span>
                                    )}
                                </div>
                                <p className="text-muted-foreground">{addr.address}</p>
                            </div>
                        </div>
                         <div className="flex gap-2">
                            <Button variant="ghost" size="icon">
                                <Edit className="h-4 w-4" />
                            </Button>
                             <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive">
                                <Trash2 className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                ))}
            </CardContent>
        </Card>
    );
}
