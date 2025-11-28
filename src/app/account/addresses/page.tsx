'use client';

import { useUser, useFirestore, useCollection, useMemoFirebase } from '@/firebase';
import { collection } from 'firebase/firestore';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { PlusCircle, MapPin, Edit, Trash2, Loader2 } from 'lucide-react';
import { deleteAddress } from '@/lib/user';
import type { Address } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';

export default function SavedAddressesPage() {
    const { user } = useUser();
    const firestore = useFirestore();
    const { toast } = useToast();

    const addressesQuery = useMemoFirebase(() => {
        if (!user || !firestore) return null;
        return collection(firestore, 'customers', user.uid, 'addresses');
    }, [user, firestore]);

    const { data: addresses, isLoading } = useCollection<Address>(addressesQuery);

    const handleDelete = async (addressId: string) => {
        if (!user) return;
        try {
            await deleteAddress(user.uid, addressId);
            toast({
                title: 'Address Deleted',
                description: 'The address has been successfully removed.',
            });
        } catch (error) {
            console.error("Error deleting address: ", error);
            toast({
                variant: 'destructive',
                title: 'Error',
                description: 'Could not delete the address. Please try again.',
            });
        }
    };

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
                {isLoading ? (
                    <div className="flex justify-center items-center h-40">
                        <Loader2 className="h-8 w-8 animate-spin text-primary" />
                    </div>
                ) : addresses && addresses.length > 0 ? (
                    addresses.map((addr) => (
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
                                    <p className="text-muted-foreground">{addr.street}, {addr.city}, {addr.postcode}, {addr.country}</p>
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <Button variant="ghost" size="icon">
                                    <Edit className="h-4 w-4" />
                                </Button>
                                <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive" onClick={() => handleDelete(addr.id)}>
                                    <Trash2 className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="text-center p-8 border-dashed border-2 rounded-lg">
                        <p className="text-muted-foreground">You have no saved addresses.</p>
                        <Button className="mt-4">
                            <PlusCircle className="mr-2 h-4 w-4" />
                            Add an Address
                        </Button>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
