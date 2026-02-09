
import React, { useState } from 'react';
import { AuthProvider, useAuth } from './auth/AuthContext';
import LoginPage from './pages/LoginPage';
import Dashboard from './pages/Dashboard';
import UserManagement from './pages/UserManagement';
import SearchPage from './pages/SearchPage';
import Header from './components/Header';
import { Visitor } from './types';
import IDCardModal from './components/IDCardModal';

type Page = 'dashboard' | 'userManagement' | 'search';

const AppContent: React.FC = () => {
    const { currentUser } = useAuth();
    const [currentPage, setCurrentPage] = useState<Page>('dashboard');
    const [visitors, setVisitors] = useState<Visitor[]>([]);
    const [visitorForIdCard, setVisitorForIdCard] = useState<Visitor | null>(null);

    const addVisitor = (visitorData: Omit<Visitor, 'id' | 'entryTime' | 'exitTime'>): Visitor => {
        const newVisitor: Visitor = {
          ...visitorData,
          id: `visitor_${Date.now()}`,
          entryTime: new Date(),
          exitTime: null,
        };
        setVisitors(prevVisitors => [newVisitor, ...prevVisitors]);
        return newVisitor;
    };

    const handleCheckOut = (visitorId: string) => {
        setVisitors(prevVisitors =>
          prevVisitors.map(visitor =>
            visitor.id === visitorId ? { ...visitor, exitTime: new Date() } : visitor
          )
        );
    };

    if (!currentUser) {
        return <LoginPage />;
    }

    return (
        <div className="min-h-screen bg-gray-50 text-gray-800">
            <Header onNavigate={setCurrentPage} />
            <main className="container mx-auto p-4 md:p-8">
                {currentPage === 'dashboard' && <Dashboard visitors={visitors} addVisitor={addVisitor} onCheckOut={handleCheckOut} setVisitorForIdCard={setVisitorForIdCard} />}
                {currentPage === 'userManagement' && <UserManagement />}
                {currentPage === 'search' && <SearchPage allVisitors={visitors} onCheckOut={handleCheckOut} setVisitorForIdCard={setVisitorForIdCard} />}
            </main>
            {visitorForIdCard && (
                <IDCardModal visitor={visitorForIdCard} onClose={() => setVisitorForIdCard(null)} />
            )}
        </div>
    );
};


const App: React.FC = () => {
  return (
    <AuthProvider>
        <AppContent />
    </AuthProvider>
  );
};

export default App;
