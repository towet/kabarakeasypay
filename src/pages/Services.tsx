import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, CreditCard, Smartphone, Building, Users, User, GraduationCap, Coffee, Bed, Plus, Minus, BookOpen, Utensils, Home, Sparkles, Zap, Shield, CheckCircle, Star, Award, Palette, Phone, Lock, Clock, Receipt } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

// Import images
import schoolFeesImg from '@/assets/school-fees.jpg';
import cafeteriaImg from '@/assets/cafeteria.jpg';
import hostelImg from '@/assets/hostel.jpg';


type ServiceType = "fees" | "cafeteria" | "hostel" | null;
type PaymentMethod = "bank" | "mpesa" | null;
type PaymentStep = "items" | "summary" | "payment" | "processing" | "success";

interface PaymentItem {
  id: string;
  name: string;
  amount: number;
  description?: string;
  customAmount?: boolean;
  icon?: React.ReactNode;
}

const Services = () => {
  const [selectedService, setSelectedService] = useState<ServiceType>(null);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>(null);
  const [selectedItems, setSelectedItems] = useState<{[key: string]: number}>({});
  const [customAmounts, setCustomAmounts] = useState<{[key: string]: number}>({});
  const [paymentDescription, setPaymentDescription] = useState("");
  const [totalAmount, setTotalAmount] = useState(0);
  const [currentStep, setCurrentStep] = useState<PaymentStep>("items");
  const [showSummaryModal, setShowSummaryModal] = useState(false);
  const [showMpesaModal, setShowMpesaModal] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [mpesaPin, setMpesaPin] = useState("");
  const [showProcessing, setShowProcessing] = useState(false);
  const [showStkCloneModal, setShowStkCloneModal] = useState(false);
  const [stkPin, setStkPin] = useState("");
  const [showMpesaSpinner, setShowMpesaSpinner] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const feeOptions: PaymentItem[] = [
    { id: "tuition", name: "Tuition Fees", amount: 50000, description: "Full semester tuition payment", icon: <GraduationCap className="h-5 w-5" /> },
    { id: "library", name: "Library Fees", amount: 2000, description: "Access to library resources", icon: <BookOpen className="h-5 w-5" /> },
    { id: "lab", name: "Laboratory Fees", amount: 5000, description: "Laboratory equipment and materials", icon: <Building className="h-5 w-5" /> },
    { id: "sports", name: "Sports Fees", amount: 1500, description: "Sports facilities and activities", icon: <Star className="h-5 w-5" /> },
    { id: "medical", name: "Medical Fees", amount: 3000, description: "Campus health services", icon: <Shield className="h-5 w-5" /> },
    { id: "custom-fee", name: "Other Fees", amount: 0, description: "Custom payment amount", customAmount: true, icon: <Award className="h-5 w-5" /> },
  ];

  const cafeteriaOptions: PaymentItem[] = [
    { id: "breakfast", name: "Breakfast Package", amount: 150, description: "Daily breakfast meal", icon: <Coffee className="h-5 w-5" /> },
    { id: "lunch", name: "Lunch Package", amount: 250, description: "Daily lunch meal", icon: <Utensils className="h-5 w-5" /> },
    { id: "dinner", name: "Dinner Package", amount: 200, description: "Daily dinner meal", icon: <Home className="h-5 w-5" /> },
    { id: "snacks", name: "Snacks & Beverages", amount: 100, description: "Light snacks and drinks", icon: <Sparkles className="h-5 w-5" /> },
    { id: "weekly", name: "Weekly Meal Plan", amount: 1200, description: "Complete weekly meal package", icon: <Award className="h-5 w-5" /> },
    { id: "custom-meal", name: "Custom Amount", amount: 0, description: "Custom meal payment", customAmount: true, icon: <Palette className="h-5 w-5" /> },
  ];

  const hostelOptions: PaymentItem[] = [
    { id: "shared-basic", name: "Shared Room - Basic", amount: 15000, description: "Basic shared accommodation", icon: <Users className="h-5 w-5" /> },
    { id: "shared-premium", name: "Shared Room - Premium", amount: 20000, description: "Premium shared room with amenities", icon: <Star className="h-5 w-5" /> },
    { id: "personal-standard", name: "Personal Room - Standard", amount: 35000, description: "Private room with standard facilities", icon: <User className="h-5 w-5" /> },
    { id: "personal-deluxe", name: "Personal Room - Deluxe", amount: 45000, description: "Luxury private room with premium amenities", icon: <Award className="h-5 w-5" /> },
    { id: "custom-hostel", name: "Other Payments", amount: 0, description: "Custom accommodation payment", customAmount: true, icon: <Building className="h-5 w-5" /> },
  ];

  const handleItemSelect = (item: PaymentItem) => {
    const newSelectedItems = { ...selectedItems };
    const newCustomAmounts = { ...customAmounts };
    
    if (selectedItems[item.id]) {
      delete newSelectedItems[item.id];
      delete newCustomAmounts[item.id];
    } else {
      newSelectedItems[item.id] = item.customAmount ? (customAmounts[item.id] || 1000) : item.amount;
      if (item.customAmount) {
        newCustomAmounts[item.id] = customAmounts[item.id] || 1000;
      }
    }
    
    setSelectedItems(newSelectedItems);
    setCustomAmounts(newCustomAmounts);
    
    const total = Object.values(newSelectedItems).reduce((sum, amount) => sum + amount, 0);
    setTotalAmount(total);
  };

  const handleCustomAmountChange = (itemId: string, amount: number) => {
    const newCustomAmounts = { ...customAmounts };
    const newSelectedItems = { ...selectedItems };
    
    newCustomAmounts[itemId] = amount;
    if (selectedItems[itemId]) {
      newSelectedItems[itemId] = amount;
    }
    
    setCustomAmounts(newCustomAmounts);
    setSelectedItems(newSelectedItems);
    
    const total = Object.values(newSelectedItems).reduce((sum, amount) => sum + amount, 0);
    setTotalAmount(total);
  };

  const handleProceedToPayment = () => {
    if (Object.keys(selectedItems).length === 0 || !paymentDescription.trim()) {
      toast({
        title: "Incomplete Information",
        description: "Please select items and add a payment description",
        variant: "destructive",
      });
      return;
    }
    setShowSummaryModal(true);
  };

  const handleSelectPaymentMethod = (method: PaymentMethod) => {
    setPaymentMethod(method);
    setShowSummaryModal(false);
    if (method === 'mpesa') {
      setShowMpesaModal(true);
    } else if (method === 'bank') {
      setCurrentStep('payment');
    } else {
      setCurrentStep("payment");
    }
  };

  const handleMpesaPayment = () => {
    if (!phoneNumber) {
      toast({
        title: "Phone Number Required",
        description: "Please enter your phone number",
        variant: "destructive",
      });
      return;
    }
    setShowProcessing(true);
    setTimeout(() => {
      setShowProcessing(false);
      setCurrentStep("processing");
    }, 3000);
  };

  const handleMpesaPin = () => {
    if (!mpesaPin || mpesaPin.length !== 4) {
      toast({
        title: "Invalid PIN",
        description: "Please enter your 4-digit M-Pesa PIN",
        variant: "destructive",
      });
      return;
    }
    setTimeout(() => {
      setCurrentStep("success");
    }, 2000);
  };

  const handleBankPayment = () => {
    setTimeout(() => {
      setCurrentStep("success");
    }, 1000);
  };

  const resetForm = () => {
    setSelectedService(null);
    setPaymentMethod(null);
    setSelectedItems({});
    setCustomAmounts({});
    setPaymentDescription("");
    setTotalAmount(0);
    setCurrentStep("items");
    setPhoneNumber("");
    setMpesaPin("");
    setShowProcessing(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 relative overflow-hidden">
      {/* Subtle animated background elements */}
      <div className="absolute inset-0 opacity-30">
        <motion.div 
          className="absolute top-20 left-10 w-96 h-96 bg-blue-100/30 rounded-full mix-blend-multiply filter blur-xl"
          animate={{ 
            x: [0, 150, -50, 0],
            y: [0, -100, 50, 0],
            rotate: [0, 180, 360],
            scale: [1, 1.2, 0.8, 1]
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute top-40 right-10 w-80 h-80 bg-emerald-100/30 rounded-full mix-blend-multiply filter blur-xl"
          animate={{ 
            x: [0, -100, 80, 0],
            y: [0, 120, -60, 0],
            scale: [1, 1.3, 0.9, 1],
            rotate: [0, -90, 180, 0]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute bottom-20 left-1/3 w-72 h-72 bg-purple-100/30 rounded-full mix-blend-multiply filter blur-xl"
          animate={{ 
            rotate: [0, -180, -360],
            scale: [1, 0.7, 1.1, 1],
            x: [0, 100, -50, 0],
            y: [0, -80, 40, 0]
          }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        />
      </div>

      {/* Floating particles effect */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-gray-300/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -100, 0],
              opacity: [0, 1, 0],
              scale: [0, 1, 0]
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 py-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              variant="outline"
              onClick={() => navigate("/")}
              className="mb-6"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Button>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="text-center"
          >
            <motion.h1 
              className="text-7xl font-bold text-gray-900 mb-6"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              Payment Services
            </motion.h1>
            <motion.p 
              className="text-2xl text-gray-600 max-w-3xl mx-auto mb-8 leading-relaxed"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              Experience our award-winning payment interface with cutting-edge design and seamless interactions
            </motion.p>
            
            <motion.div
              className="flex items-center justify-center mt-6 gap-4"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.7, duration: 0.6 }}
            >
              <motion.div 
                className="flex items-center gap-2 px-4 py-2 bg-blue-100 rounded-full border border-blue-200"
                whileHover={{ scale: 1.05 }}
              >
                <Sparkles className="h-5 w-5 text-blue-600 animate-pulse" />
                <span className="text-blue-600 font-semibold">Secure</span>
              </motion.div>
              <motion.div 
                className="flex items-center gap-2 px-4 py-2 bg-emerald-100 rounded-full border border-emerald-200"
                whileHover={{ scale: 1.05 }}
              >
                <Zap className="h-5 w-5 text-emerald-600 animate-pulse" />
                <span className="text-emerald-600 font-semibold">Lightning Fast</span>
              </motion.div>
              <motion.div 
                className="flex items-center gap-2 px-4 py-2 bg-purple-100 rounded-full border border-purple-200"
                whileHover={{ scale: 1.05 }}
              >
                <Shield className="h-5 w-5 text-purple-600 animate-pulse" />
                <span className="text-purple-600 font-semibold">Reliable</span>
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
        <AnimatePresence mode="wait">
          {!selectedService ? (
            <motion.div
              key="service-selection"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.3 } }}
              className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto"
            >
              <ServiceCard
                icon={<BookOpen className="h-12 w-12" />}
                title="School Fees Payment"
                description="Pay your academic fees with advanced security and instant confirmation"
                color="from-blue-500 to-blue-600"
                features={["Instant Receipt", "Secure Processing", "Multiple Options"]}
                image={schoolFeesImg}
                onClick={() => setSelectedService("fees")}
                delay={0}
              />
              <ServiceCard
                icon={<Utensils className="h-12 w-12" />}
                title="Cafeteria Payments"
                description="Order meals and manage your food expenses with smart meal planning"
                color="from-emerald-500 to-emerald-600"
                features={["Smart Orders", "Meal Planning", "Quick Payment"]}
                image={cafeteriaImg}
                onClick={() => setSelectedService("cafeteria")}
                delay={0.1}
              />
              <ServiceCard
                icon={<Home className="h-12 w-12" />}
                title="Hostel Accommodation"
                description="Book and pay for your accommodation with real-time availability"
                color="from-purple-500 to-purple-600"
                features={["Live Availability", "Room Selection", "Flexible Payment"]}
                image={hostelImg}
                onClick={() => setSelectedService("hostel")}
                delay={0.2}
              />
            </motion.div>
          ) : (
            <motion.div
              key="payment-form"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50, transition: { duration: 0.3 } }}
              className="max-w-5xl mx-auto"
            >
              <motion.div
                initial={{ scale: 0.95 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.1 }}
              >
                <Card className="bg-white shadow-xl overflow-hidden relative border">
                  <CardHeader className="relative z-10 border-b">
                    <div className="flex items-center justify-between">
                      <motion.div 
                        className="flex items-center gap-4"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                      >
                        <motion.div 
                          className={`p-4 rounded-2xl bg-gradient-to-br shadow-lg ${
                            selectedService === "fees" ? "from-blue-500 to-blue-600" :
                            selectedService === "cafeteria" ? "from-emerald-500 to-emerald-600" :
                            "from-purple-500 to-purple-600"
                          }`}
                          whileHover={{ scale: 1.1, rotate: 5 }}
                          transition={{ duration: 0.3 }}
                        >
                          {selectedService === "fees" && <BookOpen className="h-10 w-10 text-white" />}
                          {selectedService === "cafeteria" && <Utensils className="h-10 w-10 text-white" />}
                          {selectedService === "hostel" && <Home className="h-10 w-10 text-white" />}
                        </motion.div>
                        <div>
                          <CardTitle className="text-4xl text-gray-900 font-bold mb-2">
                            {selectedService === "fees" && "School Fees Payment"}
                            {selectedService === "cafeteria" && "Cafeteria Payments"}
                            {selectedService === "hostel" && "Hostel Accommodation"}
                          </CardTitle>
                          <p className="text-gray-600 text-lg">
                            {selectedService === "fees" && "Secure academic fee processing with instant confirmation"}
                            {selectedService === "cafeteria" && "Smart meal payment system with advanced planning"}
                            {selectedService === "hostel" && "Accommodation booking & payment with real-time updates"}
                          </p>
                        </div>
                      </motion.div>
                      <motion.div
                        whileHover={{ scale: 1.1, rotate: 90 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <Button variant="outline" onClick={resetForm} className="p-4 h-auto">
                          <ArrowLeft className="h-6 w-6" />
                        </Button>
                      </motion.div>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="space-y-10 relative z-10 p-8">
                    {/* Item Selection */}
                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      <div className="flex items-center gap-4 mb-8">
                        <motion.div 
                          className="p-3 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl"
                          whileHover={{ scale: 1.1, rotate: 5 }}
                        >
                          <Zap className="h-7 w-7 text-white" />
                        </motion.div>
                        <h3 className="text-3xl font-bold text-gray-900">
                          {selectedService === "hostel" ? "Select Accommodation" : "Select Payment Items"}
                        </h3>
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        {(selectedService === "fees" ? feeOptions : 
                          selectedService === "cafeteria" ? cafeteriaOptions : 
                          hostelOptions).map((item, index) => (
                          <motion.div
                            key={item.id}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.4 + index * 0.1 }}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            <Card 
                              className={`cursor-pointer transition-all duration-300 border-2 ${
                                selectedItems[item.id] 
                                  ? 'border-blue-500 bg-blue-50 shadow-lg' 
                                  : 'border-gray-200 hover:border-gray-300 hover:shadow-md'
                              }`}
                              onClick={() => handleItemSelect(item)}
                            >
                              <CardContent className="p-6">
                                <div className="flex items-center justify-between mb-4">
                                  <div className="flex items-center gap-3">
                                    <div className={`p-2 rounded-lg ${
                                      selectedItems[item.id] ? 'bg-blue-200' : 'bg-gray-100'
                                    }`}>
                                      {item.icon}
                                    </div>
                                    <div>
                                      <h4 className="font-bold text-lg text-gray-900">{item.name}</h4>
                                      <p className="text-gray-600 text-sm">{item.description}</p>
                                    </div>
                                  </div>
                                  <div className="text-right">
                                    {!item.customAmount ? (
                                      <Badge variant="secondary" className="text-lg font-bold">
                                        KSh {item.amount.toLocaleString()}
                                      </Badge>
                                    ) : (
                                      <Badge variant="outline" className="text-lg font-bold">
                                        Custom
                                      </Badge>
                                    )}
                                  </div>
                                </div>
                                
                                {selectedItems[item.id] && item.customAmount && (
                                  <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: "auto" }}
                                    className="mt-4 pt-4 border-t border-gray-200"
                                  >
                                    <Label htmlFor={`amount-${item.id}`} className="font-semibold text-gray-700">
                                      Enter Amount (KSh)
                                    </Label>
                                    <Input
                                      id={`amount-${item.id}`}
                                      type="number"
                                      min="100"
                                      value={customAmounts[item.id] || 1000}
                                      onChange={(e) => handleCustomAmountChange(item.id, parseInt(e.target.value) || 0)}
                                      className="mt-2 text-lg font-semibold"
                                      placeholder="Enter amount"
                                    />
                                  </motion.div>
                                )}
                              </CardContent>
                            </Card>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>

                    {/* Payment Description */}
                    {currentStep === "items" && (
                      <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                      >
                        <div className="flex items-center gap-4 mb-6">
                          <motion.div 
                            className="p-3 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl"
                            whileHover={{ scale: 1.1, rotate: 5 }}
                          >
                            <Star className="h-7 w-7 text-white" />
                          </motion.div>
                          <h3 className="text-3xl font-bold text-gray-900">Payment Description</h3>
                        </div>
                        
                        <div className="space-y-4">
                          <Label htmlFor="payment-description" className="text-lg font-semibold text-gray-700">
                            What is this payment for?
                          </Label>
                          <Input
                            id="payment-description"
                            value={paymentDescription}
                            onChange={(e) => setPaymentDescription(e.target.value)}
                            placeholder="e.g., Semester 1 tuition fees, Weekly meal plan, Room booking deposit..."
                            className="text-lg p-4 h-auto"
                          />
                        </div>
                        
                        {/* Proceed to Payment Button */}
                        <AnimatePresence>
                          {Object.keys(selectedItems).length > 0 && paymentDescription.trim() && (
                            <motion.div
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -20 }}
                              className="mt-6"
                            >
                              <Button 
                                onClick={handleProceedToPayment}
                                className="w-full text-xl py-4 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold rounded-xl"
                              >
                                Proceed to Payment Summary
                              </Button>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.div>
                    )}

                    {/* Payment Summary */}
                    {showSummaryModal && (
                      <motion.div
                        key="summary-modal"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4"
                        onClick={() => setShowSummaryModal(false)}
                      >
                        <motion.div
                          initial={{ opacity: 0, scale: 0.9, y: 20 }}
                          animate={{ opacity: 1, scale: 1, y: 0 }}
                          exit={{ opacity: 0, scale: 0.9, y: 20 }}
                          transition={{ duration: 0.3 }}
                          className="relative w-full max-w-4xl"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <Card className="bg-gray-50 border-2 border-dashed border-gray-300">
                            <CardContent className="p-8">
                              <div className="flex items-center gap-4 mb-6">
                                <motion.div 
                                  className="p-3 bg-gradient-to-br from-green-500 to-green-600 rounded-xl"
                                  whileHover={{ scale: 1.1, rotate: 5 }}
                                >
                                  <Receipt className="h-7 w-7 text-white" />
                                </motion.div>
                                <h3 className="text-3xl font-bold text-gray-900">Payment Summary</h3>
                              </div>
                              
                              <div className="grid md:grid-cols-2 gap-8">
                                <div>
                                  <h4 className="font-bold text-xl text-gray-900 mb-4">Selected Items</h4>
                                  <div className="space-y-3">
                                    {Object.entries(selectedItems).map(([itemId, amount]) => {
                                      const itemDetails = [...feeOptions, ...cafeteriaOptions, ...hostelOptions].find(item => item.id === itemId);
                                      return (
                                        <div key={itemId} className="flex justify-between items-center p-3 bg-white rounded-lg border">
                                          <span className="font-medium text-gray-700">{itemDetails?.name}</span>
                                          <Badge variant="secondary" className="font-bold">
                                            KSh {amount.toLocaleString()}
                                          </Badge>
                                        </div>
                                      );
                                    })}
                                  </div>
                                </div>
                                
                                <div>
                                  <h4 className="font-bold text-xl text-gray-900 mb-4">Payment Details</h4>
                                  <div className="space-y-4">
                                    <div className="p-4 bg-white rounded-lg border">
                                      <div className="text-sm text-gray-600 mb-1">Description</div>
                                      <div className="font-medium text-gray-900">{paymentDescription}</div>
                                    </div>
                                    <div className="p-6 bg-blue-50 rounded-lg border-2 border-blue-200">
                                      <div className="text-lg text-blue-600 mb-1">Total Amount</div>
                                      <div className="text-4xl font-bold text-blue-900">
                                        KSh {totalAmount.toLocaleString()}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              
                              <div className="mt-8">
                                <h4 className="font-bold text-xl text-gray-900 mb-4">Select Payment Method</h4>
                                <div className="grid md:grid-cols-2 gap-6">
                                  <motion.div
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="cursor-pointer"
                                    onClick={() => handleSelectPaymentMethod("mpesa")}
                                  >
                                    <Card className="hover:shadow-lg border-gray-200">
                                      <CardContent className="p-6">
                                        <div className="flex items-center gap-4">
                                          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRrsEK8qxZlovYSi3dbdhn2b5aUX7iRYsnW-jWcPryjqglfWWmJB3LyeKUyiKlVK31ihD8&usqp=CAU" alt="M-Pesa" className="h-8 w-8 object-contain mr-4" />
                                          <div>
                                            <h3 className="font-bold text-lg text-gray-900">M-Pesa</h3>
                                            <p className="text-gray-600">Pay instantly via mobile money</p>
                                          </div>
                                        </div>
                                      </CardContent>
                                    </Card>
                                  </motion.div>

                                  <motion.div
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="cursor-pointer"
                                    onClick={() => handleSelectPaymentMethod("bank")}
                                  >
                                    <Card className="hover:shadow-lg border-gray-200">
                                      <CardContent className="p-6">
                                        <div className="flex items-center gap-4">
                                          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSeViqqVwFH-m9aaQOxducw3zthv1DjHW96kQ&s" alt="Bank Transfer" className="h-8 w-8 object-contain mr-4" />
                                          <div>
                                            <h3 className="font-bold text-lg text-gray-900">Bank Transfer</h3>
                                            <p className="text-gray-600">Secure bank-to-bank transfers</p>
                                          </div>
                                        </div>
                                      </CardContent>
                                    </Card>
                                  </motion.div>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        </motion.div>
                      </motion.div>
                    )}

                    {/* M-Pesa Payment Modal */}
                    {showMpesaModal && (
                      <motion.div
                        key="mpesa-modal"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4"
                        onClick={() => setShowMpesaModal(false)}
                      >
                        <motion.div
                          initial={{ opacity: 0, scale: 0.9, y: 20 }}
                          animate={{ opacity: 1, scale: 1, y: 0 }}
                          exit={{ opacity: 0, scale: 0.9, y: 20 }}
                          transition={{ duration: 0.3 }}
                          className="relative w-full max-w-md"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -50 }}
                          >
                            {!showProcessing ? (
                              <Card className="bg-emerald-50 border-emerald-200">
                                <CardContent className="p-8">
                                  <div className="flex items-center gap-4 mb-6">
                                    <motion.div 
                                      className="p-3 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl"
                                      whileHover={{ scale: 1.1, rotate: 5 }}
                                    >
                                      <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRrsEK8qxZlovYSi3dbdhn2b5aUX7iRYsnW-jWcPryjqglfWWmJB3LyeKUyiKlVK31ihD8&usqp=CAU" alt="M-Pesa" className="h-7 w-7 object-contain" />
                                    </motion.div>
                                    <h3 className="text-3xl font-bold text-gray-900">M-Pesa Payment</h3>
                                  </div>
                                  
                                  <div className="space-y-6">
                                    <div>
                                      <Label htmlFor="phone-number" className="text-lg font-medium text-gray-800">Phone Number</Label>
                                      <div className="relative mt-2">
                                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                                        <Input 
                                          id="phone-number" 
                                          type="tel" 
                                          placeholder="e.g., 0712345678"
                                          value={phoneNumber}
                                          onChange={(e) => setPhoneNumber(e.target.value)}
                                          className="pl-10 text-lg py-6"
                                        />
                                      </div>
                                    </div>
                                    
                                    <Button 
                                      onClick={handleMpesaPayment}
                                      className="w-full text-xl py-4 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-bold rounded-xl"
                                    >
                                      <Zap className="mr-3 h-6 w-6" />
                                      Pay KSh {totalAmount.toLocaleString()}
                                    </Button>
                                  </div>
                                </CardContent>
                              </Card>
                            ) : (
                              <Card className="bg-white">
                                <CardContent className="p-8 text-center">
                                  <motion.div
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                    className="inline-block mb-4"
                                  >
                                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRrsEK8qxZlovYSi3dbdhn2b5aUX7iRYsnW-jWcPryjqglfWWmJB3LyeKUyiKlVK31ihD8&usqp=CAU" alt="M-Pesa" className="h-12 w-12 object-contain" />
                                  </motion.div>
                                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Safaricom M-Pesa STK Push</h3>
                                  <p className="text-lg text-gray-700 mb-4">
                                    A pop-up has been sent to your phone. Please enter your M-Pesa PIN to complete the payment.
                                  </p>
                                  <div className="w-full max-w-xs mx-auto">
                                    <Input 
                                      type="password"
                                      placeholder="Enter PIN to confirm"
                                      value={mpesaPin}
                                      onChange={(e) => setMpesaPin(e.target.value)}
                                      className="text-center text-2xl tracking-widest py-6 mb-4"
                                    />
                                    <Button 
                                      onClick={handleMpesaPin}
                                      className="w-full text-xl py-4 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-bold rounded-xl"
                                    >
                                      <Lock className="mr-3 h-6 w-6" />
                                      Confirm Payment
                                    </Button>
                                  </div>
                                </CardContent>
                              </Card>
                            )}
                          </motion.div>
                        </motion.div>
                      </motion.div>
                    )}

                    {/* Bank Transfer Details */}
                    {currentStep === "payment" && paymentMethod === "bank" && (
                      <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -50 }}
                      >
                        <Card className="bg-blue-50 border-blue-200">
                          <CardContent className="p-8">
                            <div className="flex items-center gap-4 mb-6">
                              <motion.div 
                                className="p-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl"
                                whileHover={{ scale: 1.1, rotate: 5 }}
                              >
                                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSeViqqVwFH-m9aaQOxducw3zthv1DjHW96kQ&s" alt="Bank Transfer" className="h-7 w-7 object-contain mr-4" />
                              </motion.div>
                              <h3 className="text-3xl font-bold text-gray-900">Bank Transfer Details</h3>
                            </div>
                            
                            <div className="grid md:grid-cols-3 gap-6 mb-6">
                              <Card className="border-2 border-green-200 hover:border-green-400 transition-colors">
                                <CardContent className="p-6 text-center">
                                  <div className="text-lg font-bold text-gray-900 mb-2">KCB Bank</div>
                                  <div className="text-sm text-gray-600 mb-2">Account Number</div>
                                  <div className="text-xl font-bold text-green-600">1234567890</div>
                                  <div className="text-sm text-gray-500 mt-2">Kabarak Easy Pay</div>
                                </CardContent>
                              </Card>
                              
                              <Card className="border-2 border-red-200 hover:border-red-400 transition-colors">
                                <CardContent className="p-6 text-center">
                                  <div className="text-lg font-bold text-gray-900 mb-2">Equity Bank</div>
                                  <div className="text-sm text-gray-600 mb-2">Account Number</div>
                                  <div className="text-xl font-bold text-red-600">9876543210</div>
                                  <div className="text-sm text-gray-500 mt-2">Kabarak Easy Pay</div>
                                </CardContent>
                              </Card>
                              
                              <Card className="border-2 border-orange-200 hover:border-orange-400 transition-colors">
                                <CardContent className="p-6 text-center">
                                  <div className="text-lg font-bold text-gray-900 mb-2">Co-operative Bank</div>
                                  <div className="text-sm text-gray-600 mb-2">Account Number</div>
                                  <div className="text-xl font-bold text-orange-600">5555666677</div>
                                  <div className="text-sm text-gray-500 mt-2">Kabarak Easy Pay</div>
                                </CardContent>
                              </Card>
                            </div>
                            
                            <div className="p-6 bg-white rounded-lg border mb-6">
                              <h4 className="font-bold text-lg text-gray-900 mb-3">Payment Instructions</h4>
                              <ul className="space-y-2 text-gray-700">
                                <li>• Transfer exactly <span className="font-bold text-blue-600">KSh {totalAmount.toLocaleString()}</span> to any of the above accounts</li>
                                <li>• Use your registration number as the reference</li>
                                <li>• Keep your transaction receipt for verification</li>
                                <li>• Payment confirmation will be sent via SMS within 24 hours</li>
                              </ul>
                            </div>
                            
                            <Button 
                              onClick={handleBankPayment}
                              className="w-full text-xl py-4 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold rounded-xl"
                            >
                              I Have Made the Payment
                            </Button>
                          </CardContent>
                        </Card>
                      </motion.div>
                    )}

                    {/* Success Message */}
                    {currentStep === "success" && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                      >
                        <Card className="bg-green-50 border-green-200">
                          <CardContent className="p-8 text-center">
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{ type: "spring", stiffness: 300, delay: 0.2 }}
                              className="inline-block mb-6"
                            >
                              <div className="p-6 bg-green-600 rounded-full">
                                <CheckCircle className="h-16 w-16 text-white" />
                              </div>
                            </motion.div>
                            
                            <motion.h3 
                              className="text-3xl font-bold text-gray-900 mb-4"
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.4 }}
                            >
                              Payment Successful!
                            </motion.h3>
                            
                            <motion.p 
                              className="text-lg text-gray-700 mb-6"
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.6 }}
                            >
                              Your payment of <span className="font-bold text-green-600">KSh {totalAmount.toLocaleString()}</span> has been processed successfully.
                            </motion.p>
                            
                            <motion.div
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.8 }}
                              className="space-y-4"
                            >
                              <Button 
                                onClick={resetForm}
                                className="w-full text-xl py-4 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold rounded-xl"
                              >
                                Make Another Payment
                              </Button>
                              
                              <Button 
                                variant="outline"
                                onClick={() => navigate("/")}
                                className="w-full text-lg py-3"
                              >
                                Back to Home
                              </Button>
                            </motion.div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Payment Summary Modal */}
        <AnimatePresence>
        {showSummaryModal && (
          <motion.div
            key="summary-modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4"
            onClick={() => setShowSummaryModal(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.3 }}
              className="relative w-full max-w-4xl"
              onClick={(e) => e.stopPropagation()}
            >
              <Card className="bg-gray-50 border-2 border-dashed border-gray-300">
                <CardContent className="p-8">
                  <div className="flex items-center gap-4 mb-6">
                    <motion.div 
                      className="p-3 bg-gradient-to-br from-green-500 to-green-600 rounded-xl"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                    >
                      <Receipt className="h-7 w-7 text-white" />
                    </motion.div>
                    <h3 className="text-3xl font-bold text-gray-900">Payment Summary</h3>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <h4 className="font-bold text-xl text-gray-900 mb-4">Selected Items</h4>
                      <div className="space-y-3">
                        {Object.entries(selectedItems).map(([itemId, amount]) => {
                          const itemDetails = [...feeOptions, ...cafeteriaOptions, ...hostelOptions].find(item => item.id === itemId);
                          return (
                            <div key={itemId} className="flex justify-between items-center p-3 bg-white rounded-lg border">
                              <span className="font-medium text-gray-700">{itemDetails?.name}</span>
                              <Badge variant="secondary" className="font-bold">
                                KSh {amount.toLocaleString()}
                              </Badge>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-bold text-xl text-gray-900 mb-4">Payment Details</h4>
                      <div className="space-y-4">
                        <div className="p-4 bg-white rounded-lg border">
                          <div className="text-sm text-gray-600 mb-1">Description</div>
                          <div className="font-medium text-gray-900">{paymentDescription}</div>
                        </div>
                        <div className="p-6 bg-blue-50 rounded-lg border-2 border-blue-200">
                          <div className="text-lg text-blue-600 mb-1">Total Amount</div>
                          <div className="text-4xl font-bold text-blue-900">
                            KSh {totalAmount.toLocaleString()}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-8">
                    <h4 className="font-bold text-xl text-gray-900 mb-4">Select Payment Method</h4>
                    <div className="grid md:grid-cols-2 gap-6">
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="cursor-pointer"
                        onClick={() => handleSelectPaymentMethod("mpesa")}
                      >
                        <Card className="hover:shadow-lg border-gray-200">
                          <CardContent className="p-6">
                            <div className="flex items-center gap-4">
                              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRrsEK8qxZlovYSi3dbdhn2b5aUX7iRYsnW-jWcPryjqglfWWmJB3LyeKUyiKlVK31ihD8&usqp=CAU" alt="M-Pesa" className="h-8 w-8 object-contain mr-4" />
                              <div>
                                <h3 className="font-bold text-lg text-gray-900">M-Pesa</h3>
                                <p className="text-gray-600">Pay instantly via mobile money</p>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>

                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="cursor-pointer"
                        onClick={() => handleSelectPaymentMethod("bank")}
                      >
                        <Card className="hover:shadow-lg border-gray-200">
                          <CardContent className="p-6">
                            <div className="flex items-center gap-4">
                              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSeViqqVwFH-m9aaQOxducw3zthv1DjHW96kQ&s" alt="Bank Transfer" className="h-8 w-8 object-contain mr-4" />
                              <div>
                                <h3 className="font-bold text-lg text-gray-900">Bank Transfer</h3>
                                <p className="text-gray-600">Secure bank-to-bank transfers</p>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        )}
        </AnimatePresence>

        {/* M-Pesa Payment Modal */}
        <AnimatePresence>
        {showMpesaModal && (
          <motion.div
            key="mpesa-modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4"
            onClick={() => setShowMpesaModal(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.3 }}
              className="relative w-full max-w-md"
              onClick={(e) => e.stopPropagation()}
            >
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
              >
                {!showProcessing ? (
                  <Card className="bg-emerald-50 border-emerald-200">
                    <CardContent className="p-8">
                      <div className="flex items-center gap-4 mb-6">
                        <motion.div 
                          className="p-3 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl"
                          whileHover={{ scale: 1.1, rotate: 5 }}
                        >
                          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRrsEK8qxZlovYSi3dbdhn2b5aUX7iRYsnW-jWcPryjqglfWWmJB3LyeKUyiKlVK31ihD8&usqp=CAU" alt="M-Pesa" className="h-7 w-7 object-contain" />
                        </motion.div>
                        <h3 className="text-3xl font-bold text-gray-900">M-Pesa Payment</h3>
                      </div>
                      
                      <div className="space-y-6">
                        <div>
                          <Label htmlFor="phone-number" className="text-lg font-medium text-gray-800">Phone Number</Label>
                          <div className="relative mt-2">
                            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                            <Input 
                              id="phone-number" 
                              type="tel" 
                              placeholder="e.g., 0712345678"
                              value={phoneNumber}
                              onChange={(e) => setPhoneNumber(e.target.value)}
                              className="pl-10 text-lg py-6"
                            />
                          </div>
                        </div>
                        
                        <Button 
                          onClick={handleMpesaPayment}
                          className="w-full text-xl py-4 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-bold rounded-xl"
                        >
                          <Zap className="mr-3 h-6 w-6" />
                          Pay KSh {totalAmount.toLocaleString()}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ) : (
                  <Card className="bg-white">
                    <CardContent className="p-8 text-center">
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="inline-block mb-4"
                      >
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRrsEK8qxZlovYSi3dbdhn2b5aUX7iRYsnW-jWcPryjqglfWWmJB3LyeKUyiKlVK31ihD8&usqp=CAU" alt="M-Pesa" className="h-12 w-12 object-contain" />
                      </motion.div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">Safaricom M-Pesa STK Push</h3>
                      <p className="text-lg text-gray-700 mb-4">
                        A pop-up has been sent to your phone. Please enter your M-Pesa PIN to complete the payment.
                      </p>
                      <div className="w-full max-w-xs mx-auto">
                        <Button 
                          onClick={() => {
                            setShowMpesaModal(false);
                            setShowMpesaSpinner(true);
                            setTimeout(() => {
                              setShowMpesaSpinner(false);
                              setShowStkCloneModal(true);
                              setStkPin("");
                            }, 2000);
                          }}
                          className="w-full text-xl py-4 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-bold rounded-xl"
                        >
                          Okay
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </motion.div>
            </motion.div>
          </motion.div>
        )}
        </AnimatePresence>

        {/* M-Pesa Spinner Modal */}
        <AnimatePresence>
        {showMpesaSpinner && (
          <motion.div
            key="mpesa-spinner"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3 }}
              className="relative w-full max-w-xs"
              onClick={e => e.stopPropagation()}
            >
              <div className="rounded-2xl shadow-2xl bg-white p-8 max-w-xs mx-auto text-gray-900 flex flex-col items-center" style={{ fontFamily: 'system-ui, Roboto, Arial, sans-serif' }}>
                <div className="mb-6 flex flex-col items-center">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                    className="mb-4"
                  >
                    <svg className="h-12 w-12 text-green-500 animate-spin" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" className="opacity-25" />
                      <path d="M4 12a8 8 0 018-8" stroke="currentColor" strokeWidth="4" className="opacity-75" strokeLinecap="round" />
                    </svg>
                  </motion.div>
                  <div className="text-lg font-semibold text-center">Requesting payment of Ksh {totalAmount.toLocaleString()}…</div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
        </AnimatePresence>

        {/* STK Clone Modal */}
        <AnimatePresence>
        {showStkCloneModal && (
          <motion.div
            key="stk-clone-modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4"
            onClick={() => setShowStkCloneModal(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3 }}
              className="relative w-full max-w-md"
              onClick={e => e.stopPropagation()}
            >
              <div className="rounded-2xl shadow-2xl bg-white p-8 max-w-md mx-auto text-gray-900" style={{ fontFamily: 'system-ui, Roboto, Arial, sans-serif' }}>
                <div className="mb-6">
                  <div className="text-lg font-semibold mb-2">Do you want to pay Ksh {totalAmount.toLocaleString()} to</div>
                  <div className="font-medium text-base mb-1">Kabarak University Easy Pay</div>
                  <div className="text-base mt-4 mb-2">Enter M-PESA PIN:</div>
                  <input
                    type="password"
                    maxLength={6}
                    value={stkPin}
                    onChange={e => setStkPin(e.target.value)}
                    className="w-full border-b-2 border-gray-400 focus:border-green-500 outline-none text-2xl tracking-widest text-center py-2 mb-6"
                    style={{ letterSpacing: '0.3em' }}
                    autoFocus
                  />
                </div>
                <div className="flex justify-between mt-8">
                  <button
                    className="text-blue-600 font-semibold text-lg px-6 py-2 rounded hover:bg-gray-100"
                    onClick={() => setShowStkCloneModal(false)}
                  >
                    Cancel
                  </button>
                  <button
                    className={`text-white font-semibold text-lg px-8 py-2 rounded ${stkPin.length === 0 ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700'}`}
                    disabled={stkPin.length === 0}
                    onClick={() => {
                      setShowStkCloneModal(false);
                      setCurrentStep("success");
                      toast({
                        title: `Payment of Ksh ${totalAmount.toLocaleString()} was successful!`,
                        description: `You have paid Ksh ${totalAmount.toLocaleString()} via M-Pesa.`,
                      });
                    }}
                  >
                    Send
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
        </AnimatePresence>

        {/* Payment Success Modal */}
        <AnimatePresence>
        {currentStep === "success" && (
          <motion.div
            key="payment-success-modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.3 }}
              className="relative w-full max-w-md"
              onClick={e => e.stopPropagation()}
            >
              <Card className="bg-white border-green-500 border-2 shadow-2xl">
                <CardContent className="p-12 text-center">
                  <div className="flex flex-col items-center mb-2">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/Kabarak_University_Logo.png/960px-Kabarak_University_Logo.png" alt="Kabarak University Logo" className="h-20 w-auto mb-4" />
                  </div>
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1, rotate: 360 }}
                    transition={{ delay: 0.2, type: "spring" }}
                  >
                    <CheckCircle className="h-24 w-24 text-green-500 mx-auto mb-6" />
                  </motion.div>
                  <h3 className="text-4xl font-extrabold text-gray-900 mb-4">Payment Successful!</h3>
                  <p className="text-lg text-gray-600 mb-8">Thank you for your payment. Your transaction of Ksh {totalAmount.toLocaleString()} has been completed successfully.</p>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    <Button 
                      onClick={resetForm}
                      className="w-full text-lg py-3"
                    >
                      Back to Home
                    </Button>
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        )}
        </AnimatePresence>
      </div>
    </div>
  );
};

interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  color: string;
  features: string[];
  image: string;
  onClick: () => void;
  delay: number;
}

const ServiceCard = ({ icon, title, description, color, features, image, onClick, delay }: ServiceCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.6 }}
      whileHover={{ scale: 1.02, y: -10 }}
      whileTap={{ scale: 0.98 }}
      className="cursor-pointer"
      onClick={onClick}
    >
      <Card className="group relative overflow-hidden bg-white border-0 shadow-xl hover:shadow-2xl transition-all duration-500 h-full">
        <div className="relative overflow-hidden h-48">
          <img 
            src={image} 
            alt={title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
          <motion.div
            className={`absolute top-4 left-4 p-3 rounded-2xl bg-gradient-to-r ${color} text-white shadow-lg`}
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            {icon}
          </motion.div>
          <motion.div
            className="absolute top-4 right-4 flex space-x-1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: delay + 0.3 }}
          >
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            ))}
          </motion.div>
        </div>
        
        <CardContent className="p-6">
          <CardTitle className="text-2xl font-bold text-gray-900 mb-3">
            {title}
          </CardTitle>
          <p className="text-gray-600 mb-6 leading-relaxed">
            {description}
          </p>
          
          <motion.ul 
            className="space-y-3 mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: delay + 0.4 }}
          >
            {features.map((feature, index) => (
              <motion.li
                key={index}
                className="flex items-center text-gray-700"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: delay + 0.5 + index * 0.1 }}
              >
                <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                <span className="font-medium">{feature}</span>
              </motion.li>
            ))}
          </motion.ul>
          
          <motion.div
            className="pt-4 border-t border-gray-100"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button 
              className={`w-full bg-gradient-to-r ${color} hover:shadow-lg text-white font-semibold py-3 rounded-xl transition-all duration-300`}
            >
              Get Started
              <motion.div
                className="ml-2"
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                →
              </motion.div>
            </Button>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default Services;