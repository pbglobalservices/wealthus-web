import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { db } from '../config/firebase';
import { collection, query, getDocs, updateDoc, doc, addDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';

// Secondary Firebase app instance to create staff without logging out the superadmin
const secondaryApp = initializeApp({
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
}, "StaffCreationApp");
const secondaryAuth = getAuth(secondaryApp);

export default function AdminDashboard() {
  const { currentUser } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();

  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isStaff, setIsStaff] = useState(false);
  const [activeTab, setActiveTab] = useState('inquiries'); // 'inquiries' or 'staff'
  
  // Superadmin verification
  const isSuperAdmin = currentUser?.email === 'testcodecfg@gmail.com';

  // Staff creation state
  const [staffEmail, setStaffEmail] = useState('');
  const [staffPassword, setStaffPassword] = useState('');
  const [staffRole, setStaffRole] = useState('Advisor');
  const [staffStatus, setStaffStatus] = useState('');

  // Meeting notes state
  const [selectedInquiry, setSelectedInquiry] = useState(null);
  const [meetingNotes, setMeetingNotes] = useState('');
  const [inquiryStatus, setInquiryStatus] = useState('New');

  useEffect(() => {
    if (!currentUser) {
      navigate('/login');
      return;
    }

    // Google Sign-In restriction for non-superadmins
    const hasGoogleProvider = currentUser.providerData.some(p => p.providerId === 'google.com');
    if (hasGoogleProvider && !isSuperAdmin) {
      setLoading(false);
      return; // Access denied below
    }

    const checkAccessAndFetchData = async () => {
      try {
        let hasAccess = isSuperAdmin;
        
        if (!hasAccess) {
          // Check if user is registered in the staff collection
          const staffQuery = query(collection(db, 'staff'));
          const staffSnapshot = await getDocs(staffQuery);
          const staffMembers = staffSnapshot.docs.map(d => d.id);
          hasAccess = staffMembers.includes(currentUser.uid);
        }

        setIsStaff(hasAccess);

        if (hasAccess) {
          const inquiriesQuery = query(collection(db, 'contacts'));
          const inquiriesSnapshot = await getDocs(inquiriesQuery);
          const inquiriesList = inquiriesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
          // Sort by newest first based on createdAt timestamp if available
          setInquiries(inquiriesList.sort((a, b) => (b.createdAt?.toMillis() || 0) - (a.createdAt?.toMillis() || 0)));
        }
      } catch (error) {
        console.error("Error verifying access or fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    checkAccessAndFetchData();
  }, [currentUser, navigate, isSuperAdmin]);

  const handleCreateStaff = async (e) => {
    e.preventDefault();
    if (!isSuperAdmin) return;
    
    setStaffStatus('creating');
    try {
      // Create user on secondary app
      const userCredential = await createUserWithEmailAndPassword(secondaryAuth, staffEmail, staffPassword);
      const newStaffId = userCredential.user.uid;

      // Save role to Firestore
      await setDoc(doc(db, 'staff', newStaffId), {
        email: staffEmail,
        role: staffRole,
        createdAt: serverTimestamp()
      });

      setStaffStatus('success');
      setStaffEmail('');
      setStaffPassword('');
      setTimeout(() => setStaffStatus(''), 3000);
    } catch (error) {
      console.error("Error creating staff:", error);
      setStaffStatus('error');
    }
  };

  const handleUpdateInquiry = async (e) => {
    e.preventDefault();
    if (!selectedInquiry) return;

    try {
      // 1. Update contact status
      const contactRef = doc(db, 'contacts', selectedInquiry.id);
      await updateDoc(contactRef, {
        status: inquiryStatus,
        updatedAt: serverTimestamp()
      });

      // 2. Add consultation meeting notes
      if (meetingNotes.trim() !== '') {
        await addDoc(collection(db, 'consultations'), {
          userId: selectedInquiry.email, // using email as reference if actual UID is unknown
          contactId: selectedInquiry.id,
          notes: meetingNotes,
          status: inquiryStatus,
          date: new Date().toLocaleDateString(),
          handledBy: currentUser.email,
          createdAt: serverTimestamp()
        });
      }

      // Update local state
      setInquiries(inquiries.map(inq => 
        inq.id === selectedInquiry.id ? { ...inq, status: inquiryStatus } : inq
      ));
      
      setSelectedInquiry(null);
      setMeetingNotes('');
    } catch (error) {
      console.error("Error updating inquiry:", error);
    }
  };

  if (loading) {
    return <div className="min-h-[60vh] flex items-center justify-center text-[#14532d] font-medium">Verifying access...</div>;
  }

  // Deny access if not staff or if staff tried to use Google login
  const hasGoogleProvider = currentUser.providerData.some(p => p.providerId === 'google.com');
  if (!isStaff || (hasGoogleProvider && !isSuperAdmin)) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center flex-col gap-4">
        <h1 className="text-3xl font-serif text-[#14532d]">{t('adminPage.accessDenied')}</h1>
        <p className="text-[#0a0a0a]">{t('adminPage.deniedMessage')}</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 pt-12 pb-24">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6 border-b border-gray-300 pb-8">
        <div>
          <h1 className="text-4xl font-serif text-[#14532d] mb-2">{t('adminPage.title')}</h1>
          <p className="text-[#0a0a0a] font-medium">{currentUser.email} {isSuperAdmin ? '(Superadmin)' : '(Staff)'}</p>
        </div>
        
        {isSuperAdmin && (
          <div className="flex gap-4">
            <button 
              onClick={() => setActiveTab('inquiries')}
              className={`px-6 py-2 rounded-full font-medium transition-colors border ${activeTab === 'inquiries' ? 'bg-[#14532d] text-white border-[#14532d]' : 'bg-transparent text-[#14532d] border-[#14532d]'}`}
            >
              {t('adminPage.inquiriesTab')}
            </button>
            <button 
              onClick={() => setActiveTab('staff')}
              className={`px-6 py-2 rounded-full font-medium transition-colors border ${activeTab === 'staff' ? 'bg-[#14532d] text-white border-[#14532d]' : 'bg-transparent text-[#14532d] border-[#14532d]'}`}
            >
              {t('adminPage.staffTab')}
            </button>
          </div>
        )}
      </div>

      {activeTab === 'inquiries' && (
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          <div className="md:col-span-7 flex flex-col gap-6">
            <h2 className="text-2xl font-serif text-[#0a0a0a]">{t('adminPage.inquiriesTab')}</h2>
            {inquiries.length === 0 ? (
              <p className="text-[#0a0a0a] opacity-80">No customer messages found.</p>
            ) : (
              inquiries.map((inquiry) => (
                <div key={inquiry.id} className="bg-[#f8f9fa] border border-[#e5e7eb] p-6 rounded-[1.5rem] cursor-pointer hover:bg-[#e8f3e5] transition-colors" onClick={() => { setSelectedInquiry(inquiry); setInquiryStatus(inquiry.status || 'New'); }}>
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-[#14532d] text-lg">{inquiry.name}</h3>
                    <span className="bg-white border border-gray-300 text-xs px-3 py-1 rounded-full">{inquiry.status || 'New'}</span>
                  </div>
                  <p className="text-sm text-[#0a0a0a] mb-1">Phone: {inquiry.phone}</p>
                  <p className="text-sm text-[#0a0a0a] mb-3">Email: {inquiry.email}</p>
                  <p className="text-sm text-[#0a0a0a] opacity-80 line-clamp-2">{inquiry.message}</p>
                </div>
              ))
            )}
          </div>

          <div className="md:col-span-5">
            {selectedInquiry ? (
              <div className="bg-white border border-[#14532d] p-8 rounded-[2rem] sticky top-24">
                <h3 className="text-2xl font-serif text-[#14532d] mb-6">{t('adminPage.updateMeeting')}</h3>
                <p className="font-medium text-[#0a0a0a] mb-4">Client: {selectedInquiry.name}</p>
                
                <form onSubmit={handleUpdateInquiry} className="flex flex-col gap-4">
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-[#0a0a0a]">Status</label>
                    <select 
                      value={inquiryStatus} 
                      onChange={(e) => setInquiryStatus(e.target.value)}
                      className="border border-gray-300 rounded-lg p-3 outline-none focus:border-[#14532d]"
                    >
                      <option value="New">New</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Completed">Completed</option>
                    </select>
                  </div>
                  
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-[#0a0a0a]">Meeting Summary / Notes</label>
                    <textarea 
                      value={meetingNotes}
                      onChange={(e) => setMeetingNotes(e.target.value)}
                      rows="4"
                      placeholder="Write notes here to save to the client's dashboard..."
                      className="border border-gray-300 rounded-lg p-3 outline-none focus:border-[#14532d] resize-none"
                    ></textarea>
                  </div>

                  <button type="submit" className="bg-[#14532d] text-white py-3 rounded-full font-medium hover:bg-[#0f3f22] mt-4">
                    Save Changes
                  </button>
                  <button type="button" onClick={() => setSelectedInquiry(null)} className="text-[#0a0a0a] py-2 underline text-sm mt-2">
                    Cancel
                  </button>
                </form>
              </div>
            ) : (
              <div className="bg-[#f8f9fa] border border-[#e5e7eb] p-8 rounded-[2rem] flex items-center justify-center h-64 text-center">
                <p className="text-[#0a0a0a] opacity-60">Select a message from the list to update its status and add meeting notes.</p>
              </div>
            )}
          </div>
        </div>
      )}

      {isSuperAdmin && activeTab === 'staff' && (
        <div className="max-w-lg">
          <div className="bg-[#e8f3e5] p-10 rounded-[2rem]">
            <h2 className="text-2xl font-serif text-[#14532d] mb-6">{t('adminPage.staffTab')}</h2>
            <form onSubmit={handleCreateStaff} className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-[#0a0a0a]">Staff Email</label>
                <input 
                  type="email" 
                  value={staffEmail}
                  onChange={(e) => setStaffEmail(e.target.value)}
                  required
                  className="border border-gray-300 rounded-lg p-3 outline-none focus:border-[#14532d]"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-[#0a0a0a]">Temporary Password</label>
                <input 
                  type="text" 
                  value={staffPassword}
                  onChange={(e) => setStaffPassword(e.target.value)}
                  required
                  className="border border-gray-300 rounded-lg p-3 outline-none focus:border-[#14532d]"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-[#0a0a0a]">Assign Role</label>
                <select 
                  value={staffRole}
                  onChange={(e) => setStaffRole(e.target.value)}
                  className="border border-gray-300 rounded-lg p-3 outline-none focus:border-[#14532d]"
                >
                  <option value="Advisor">Advisor</option>
                  <option value="Support">Support</option>
                  <option value="Manager">Manager</option>
                </select>
              </div>
              <button type="submit" disabled={staffStatus === 'creating'} className="bg-[#14532d] text-white py-3 rounded-full font-medium hover:bg-[#0f3f22] mt-4 disabled:opacity-50">
                {staffStatus === 'creating' ? 'Creating...' : 'Register Staff Account'}
              </button>
              {staffStatus === 'success' && <p className="text-[#14532d] text-sm mt-2 font-medium">Staff added successfully.</p>}
              {staffStatus === 'error' && <p className="text-red-600 text-sm mt-2 font-medium">Failed to create account.</p>}
            </form>
          </div>
        </div>
      )}
    </div>
  );
}