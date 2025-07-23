import type React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';

export const Settings: React.FC = () => {
  const { signOut } = useAuth();
  return (
    <div className='container max-w-md mx-auto pt-8 pb-24 px-4'>
      <Card>
        <CardHeader>
          <CardTitle>設定項目</CardTitle>
        </CardHeader>
        <CardContent>
          <p className='text-gray-600 mb-4'>設定機能は今後実装予定です。</p>
          <Button variant='destructive' onClick={signOut}>
            ログアウト
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};
