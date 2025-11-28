'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHeader, TableHead, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';

const orders = [
    {
        id: 'ORD001',
        date: '2023-10-15',
        status: 'Delivered',
        total: 340.00,
        items: [{ name: 'Ambassador Park Lane Bed', quantity: 1 }],
    },
    {
        id: 'ORD002',
        date: '2023-11-01',
        status: 'Shipped',
        total: 230.00,
        items: [{ name: 'Astral Sleigh Bed', quantity: 1 }],
    },
    {
        id: 'ORD003',
        date: '2023-11-20',
        status: 'Processing',
        total: 620.00,
        items: [{ name: 'Divan Ottoman Bed', quantity: 1 }, { name: 'Verona Sofa', quantity: 1 }],
    },
];

const statusVariantMap: { [key: string]: 'default' | 'secondary' | 'destructive' | 'outline' } = {
    'Delivered': 'default',
    'Shipped': 'secondary',
    'Processing': 'outline',
    'Cancelled': 'destructive',
};

export default function OrderHistoryPage() {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="font-headline text-2xl">Order History</CardTitle>
                <CardDescription>View your past orders and their status.</CardDescription>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Order ID</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right">Total</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {orders.map((order) => (
                            <TableRow key={order.id}>
                                <TableCell className="font-medium">{order.id}</TableCell>
                                <TableCell>{order.date}</TableCell>
                                <TableCell>
                                    <Badge variant={statusVariantMap[order.status] || 'default'}>{order.status}</Badge>
                                </TableCell>
                                <TableCell className="text-right">£{order.total.toFixed(2)}</TableCell>
                                <TableCell className="text-right">
                                    <Button asChild variant="outline" size="sm">
                                        <Link href="#">View Details</Link>
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
             {orders.length === 0 && (
                <CardFooter className="justify-center">
                    <p className="text-muted-foreground">You have no past orders.</p>
                </CardFooter>
            )}
        </Card>
    );
}
