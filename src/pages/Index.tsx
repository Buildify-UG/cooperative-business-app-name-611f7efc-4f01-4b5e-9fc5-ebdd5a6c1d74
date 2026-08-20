import { useState } from "react";
import { Leaf, Users, TrendingUp, DollarSign, Heart, Zap, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

interface Member {
  id: string;
  name: string;
  email: string;
  phone: string;
  plan: string;
  joinDate: string;
  balance: number;
  totalDeposits: number;
}

interface Transaction {
  id: string;
  type: "deposit" | "withdrawal";
  amount: number;
  date: string;
  status: "pending" | "completed" | "rejected";
}

const plans = [
  {
    id: "starter",
    name: "Starter",
    price: "$50/month",
    features: ["Basic membership", "Up to $500 monthly deposits", "Standard support"],
    icon: Leaf,
  },
  {
    id: "growth",
    name: "Growth",
    price: "$150/month",
    features: ["Priority support", "Up to $2,000 monthly deposits", "Quarterly reports", "Voting rights"],
    icon: TrendingUp,
  },
  {
    id: "premium",
    name: "Premium",
    price: "$300/month",
    features: ["VIP support", "Unlimited deposits", "Monthly reports", "Full voting rights", "Investment opportunities"],
    icon: Heart,
  },
];

export default function Index() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [currentMember, setCurrentMember] = useState<Member | null>({
    id: "M001",
    name: "Sarah Johnson",
    email: "sarah@example.com",
    phone: "+1-555-0123",
    plan: "growth",
    joinDate: "2024-01-15",
    balance: 3250,
    totalDeposits: 5000,
  });

  const [members, setMembers] = useState<Member[]>([
    {
      id: "M001",
      name: "Sarah Johnson",
      email: "sarah@example.com",
      phone: "+1-555-0123",
      plan: "growth",
      joinDate: "2024-01-15",
      balance: 3250,
      totalDeposits: 5000,
    },
    {
      id: "M002",
      name: "Marcus Chen",
      email: "marcus@example.com",
      phone: "+1-555-0124",
      plan: "starter",
      joinDate: "2024-02-20",
      balance: 1200,
      totalDeposits: 1500,
    },
    {
      id: "M003",
      name: "Amara Okafor",
      email: "amara@example.com",
      phone: "+1-555-0125",
      plan: "premium",
      joinDate: "2024-01-01",
      balance: 8500,
      totalDeposits: 12000,
    },
  ]);

  const [transactions, setTransactions] = useState<Transaction[]>([
    { id: "T001", type: "deposit", amount: 500, date: "2024-08-18", status: "completed" },
    { id: "T002", type: "withdrawal", amount: 250, date: "2024-08-15", status: "completed" },
    { id: "T003", type: "deposit", amount: 1000, date: "2024-08-10", status: "completed" },
  ]);

  const [showRegistration, setShowRegistration] = useState(false);
  const [registrationData, setRegistrationData] = useState({
    name: "",
    email: "",
    phone: "",
    plan: "starter",
  });

  const [depositAmount, setDepositAmount] = useState("");
  const [withdrawalAmount, setWithdrawalAmount] = useState("");

  const handleRegister = () => {
    if (!registrationData.name || !registrationData.email || !registrationData.phone) {
      toast.error("Please fill in all fields");
      return;
    }

    const newMember: Member = {
      id: `M${String(members.length + 1).padStart(3, "0")}`,
      ...registrationData,
      joinDate: new Date().toISOString().split("T")[0],
      balance: 0,
      totalDeposits: 0,
    };

    setMembers([...members, newMember]);
    setCurrentMember(newMember);
    setRegistrationData({ name: "", email: "", phone: "", plan: "starter" });
    setShowRegistration(false);
    toast.success("Registration successful!");
  };

  const handleDeposit = () => {
    if (!depositAmount || parseFloat(depositAmount) <= 0) {
      toast.error("Enter a valid amount");
      return;
    }

    if (currentMember) {
      const amount = parseFloat(depositAmount);
      const newTransaction: Transaction = {
        id: `T${String(transactions.length + 1).padStart(3, "0")}`,
        type: "deposit",
        amount,
        date: new Date().toISOString().split("T")[0],
        status: "completed",
      };

      setTransactions([...transactions, newTransaction]);
      setCurrentMember({
        ...currentMember,
        balance: currentMember.balance + amount,
        totalDeposits: currentMember.totalDeposits + amount,
      });
      setDepositAmount("");
      toast.success(`Deposited $${amount.toFixed(2)}`);
    }
  };

  const handleWithdrawal = () => {
    if (!withdrawalAmount || parseFloat(withdrawalAmount) <= 0) {
      toast.error("Enter a valid amount");
      return;
    }

    if (currentMember) {
      const amount = parseFloat(withdrawalAmount);
      if (amount > currentMember.balance) {
        toast.error("Insufficient balance");
        return;
      }

      const newTransaction: Transaction = {
        id: `T${String(transactions.length + 1).padStart(3, "0")}`,
        type: "withdrawal",
        amount,
        date: new Date().toISOString().split("T")[0],
        status: "pending",
      };

      setTransactions([...transactions, newTransaction]);
      setCurrentMember({
        ...currentMember,
        balance: currentMember.balance - amount,
      });
      setWithdrawalAmount("");
      toast.success(`Withdrawal request submitted for $${amount.toFixed(2)}`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50">
      {/* Header */}
      <div className="border-b border-emerald-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-br from-emerald-500 to-teal-600 p-2 rounded-lg">
                <Leaf className="text-white" size={24} />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-emerald-900">ROOTED VOICES COLLECTIVE</h1>
                <p className="text-sm text-emerald-600">Cooperative Business Platform</p>
              </div>
            </div>
            {currentMember && (
              <div className="text-right">
                <p className="font-semibold text-gray-900">{currentMember.name}</p>
                <p className="text-sm text-gray-600">{currentMember.email}</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8 bg-white border border-emerald-200">
            <TabsTrigger value="dashboard" className="flex items-center gap-2">
              <TrendingUp size={18} />
              Dashboard
            </TabsTrigger>
            <TabsTrigger value="transactions" className="flex items-center gap-2">
              <DollarSign size={18} />
              Transactions
            </TabsTrigger>
            <TabsTrigger value="plans" className="flex items-center gap-2">
              <Zap size={18} />
              Plans
            </TabsTrigger>
            <TabsTrigger value="members" className="flex items-center gap-2">
              <Users size={18} />
              Members
            </TabsTrigger>
          </TabsList>

          {/* Dashboard Tab */}
          <TabsContent value="dashboard" className="space-y-6">
            {currentMember ? (
              <>
                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card className="bg-white border-emerald-200">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm text-emerald-600">Current Balance</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold text-emerald-900">
                        ${currentMember.balance.toFixed(2)}
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-white border-emerald-200">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm text-teal-600">Total Deposited</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold text-teal-900">
                        ${currentMember.totalDeposits.toFixed(2)}
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-white border-emerald-200">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm text-emerald-600">Plan</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-emerald-900 capitalize">
                        {currentMember.plan}
                      </div>
                      <p className="text-xs text-gray-600 mt-1">Joined {currentMember.joinDate}</p>
                    </CardContent>
                  </Card>
                </div>

                {/* Deposit & Withdrawal Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Deposit */}
                  <Card className="bg-white border-emerald-200 shadow-lg">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-emerald-900">
                        <TrendingUp size={20} />
                        Make a Deposit
                      </CardTitle>
                      <CardDescription>Add funds to your cooperative account</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <Label htmlFor="deposit" className="text-gray-700 font-semibold">
                          Amount ($)
                        </Label>
                        <Input
                          id="deposit"
                          type="number"
                          placeholder="Enter amount"
                          value={depositAmount}
                          onChange={(e) => setDepositAmount(e.target.value)}
                          className="mt-2 border-emerald-200"
                          min="0"
                          step="0.01"
                        />
                      </div>
                      <Button
                        onClick={handleDeposit}
                        className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-semibold"
                      >
                        Deposit Now
                      </Button>
                    </CardContent>
                  </Card>

                  {/* Withdrawal */}
                  <Card className="bg-white border-emerald-200 shadow-lg">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-emerald-900">
                        <DollarSign size={20} />
                        Request Withdrawal
                      </CardTitle>
                      <CardDescription>Withdraw from your account</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <Label htmlFor="withdrawal" className="text-gray-700 font-semibold">
                          Amount ($)
                        </Label>
                        <Input
                          id="withdrawal"
                          type="number"
                          placeholder="Enter amount"
                          value={withdrawalAmount}
                          onChange={(e) => setWithdrawalAmount(e.target.value)}
                          className="mt-2 border-emerald-200"
                          min="0"
                          step="0.01"
                          max={currentMember.balance}
                        />
                        <p className="text-xs text-gray-600 mt-2">
                          Available: ${currentMember.balance.toFixed(2)}
                        </p>
                      </div>
                      <Button
                        onClick={handleWithdrawal}
                        className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold"
                      >
                        Request Withdrawal
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </>
            ) : (
              <Card className="bg-white border-emerald-200">
                <CardContent className="pt-8 text-center">
                  <p className="text-gray-600 mb-4">No member logged in. Register to get started!</p>
                  <Button
                    onClick={() => setShowRegistration(true)}
                    className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white"
                  >
                    Register Now
                  </Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Transactions Tab */}
          <TabsContent value="transactions">
            <Card className="bg-white border-emerald-200">
              <CardHeader>
                <CardTitle className="text-emerald-900">Transaction History</CardTitle>
                <CardDescription>Your recent deposits and withdrawals</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {transactions.length === 0 ? (
                    <p className="text-center text-gray-600 py-8">No transactions yet</p>
                  ) : (
                    transactions.map((tx) => (
                      <div
                        key={tx.id}
                        className="flex items-center justify-between p-4 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-lg border border-emerald-200"
                      >
                        <div className="flex items-center gap-4">
                          <div
                            className={`p-2 rounded-lg ${
                              tx.type === "deposit"
                                ? "bg-emerald-100"
                                : "bg-orange-100"
                            }`}
                          >
                            {tx.type === "deposit" ? (
                              <TrendingUp className="text-emerald-600" size={20} />
                            ) : (
                              <DollarSign className="text-orange-600" size={20} />
                            )}
                          </div>
                          <div>
                            <p className="font-semibold text-gray-900 capitalize">
                              {tx.type}
                            </p>
                            <p className="text-sm text-gray-600">{tx.date}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p
                            className={`font-bold text-lg ${
                              tx.type === "deposit"
                                ? "text-emerald-600"
                                : "text-orange-600"
                            }`}
                          >
                            {tx.type === "deposit" ? "+" : "-"}${tx.amount.toFixed(2)}
                          </p>
                          <p
                            className={`text-xs font-semibold capitalize ${
                              tx.status === "completed"
                                ? "text-emerald-600"
                                : "text-yellow-600"
                            }`}
                          >
                            {tx.status}
                          </p>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Plans Tab */}
          <TabsContent value="plans">
            <div className="space-y-6">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-emerald-900 mb-2">Choose Your Plan</h2>
                <p className="text-gray-600">Select the perfect plan for your cooperative membership</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {plans.map((plan) => {
                  const Icon = plan.icon;
                  const isCurrentPlan = currentMember?.plan === plan.id;

                  return (
                    <Card
                      key={plan.id}
                      className={`border-2 transition-all ${
                        isCurrentPlan
                          ? "border-emerald-500 bg-gradient-to-br from-emerald-50 to-teal-50 shadow-lg"
                          : "border-emerald-200 bg-white hover:border-emerald-400"
                      }`}
                    >
                      <CardHeader>
                        <div className="flex items-center justify-between mb-4">
                          <Icon className="text-emerald-600" size={28} />
                          {isCurrentPlan && (
                            <span className="text-xs font-bold bg-emerald-500 text-white px-3 py-1 rounded-full">
                              Current
                            </span>
                          )}
                        </div>
                        <CardTitle className="text-emerald-900">{plan.name}</CardTitle>
                        <CardDescription className="text-2xl font-bold text-emerald-600 mt-2">
                          {plan.price}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <ul className="space-y-2">
                          {plan.features.map((feature, idx) => (
                            <li key={idx} className="flex items-center gap-2 text-gray-700">
                              <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                              {feature}
                            </li>
                          ))}
                        </ul>
                        <Button
                          className={`w-full mt-4 ${
                            isCurrentPlan
                              ? "bg-emerald-500 hover:bg-emerald-600 text-white"
                              : "bg-emerald-100 hover:bg-emerald-200 text-emerald-900"
                          }`}
                        >
                          {isCurrentPlan ? "Current Plan" : "Upgrade"}
                        </Button>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>
          </TabsContent>

          {/* Members Tab */}
          <TabsContent value="members">
            <Card className="bg-white border-emerald-200">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="text-emerald-900">Collective Members</CardTitle>
                  <CardDescription>
                    {members.length} active members in Rooted Voices Collective
                  </CardDescription>
                </div>
                <Button
                  onClick={() => setShowRegistration(true)}
                  className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white"
                >
                  + New Member
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {members.map((member) => (
                    <div
                      key={member.id}
                      className="p-4 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-lg border border-emerald-200 hover:border-emerald-400 transition-colors"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <p className="font-semibold text-gray-900">{member.name}</p>
                          <p className="text-sm text-gray-600">{member.email}</p>
                          <div className="flex gap-4 mt-2 text-sm">
                            <span className="text-emerald-600 font-semibold">
                              Balance: ${member.balance.toFixed(2)}
                            </span>
                            <span className="text-teal-600 font-semibold capitalize">
                              Plan: {member.plan}
                            </span>
                          </div>
                        </div>
                        <div className="text-right">
                          <Shield className="text-emerald-500 mb-2" size={24} />
                          <p className="text-xs text-gray-600">Joined</p>
                          <p className="text-xs font-semibold text-gray-900">{member.joinDate}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Registration Modal */}
      {showRegistration && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-md bg-white border-emerald-200 shadow-2xl">
            <CardHeader>
              <CardTitle className="text-emerald-900">Register New Member</CardTitle>
              <CardDescription>Join Rooted Voices Collective today</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="name" className="text-gray-700 font-semibold">
                  Full Name
                </Label>
                <Input
                  id="name"
                  placeholder="Your name"
                  value={registrationData.name}
                  onChange={(e) =>
                    setRegistrationData({ ...registrationData, name: e.target.value })
                  }
                  className="mt-2 border-emerald-200"
                />
              </div>
              <div>
                <Label htmlFor="email" className="text-gray-700 font-semibold">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  value={registrationData.email}
                  onChange={(e) =>
                    setRegistrationData({ ...registrationData, email: e.target.value })
                  }
                  className="mt-2 border-emerald-200"
                />
              </div>
              <div>
                <Label htmlFor="phone" className="text-gray-700 font-semibold">
                  Phone
                </Label>
                <Input
                  id="phone"
                  placeholder="+1-555-0000"
                  value={registrationData.phone}
                  onChange={(e) =>
                    setRegistrationData({ ...registrationData, phone: e.target.value })
                  }
                  className="mt-2 border-emerald-200"
                />
              </div>
              <div>
                <Label htmlFor="plan" className="text-gray-700 font-semibold">
                  Select Plan
                </Label>
                <select
                  id="plan"
                  value={registrationData.plan}
                  onChange={(e) =>
                    setRegistrationData({ ...registrationData, plan: e.target.value })
                  }
                  className="mt-2 w-full px-3 py-2 border border-emerald-200 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="starter">Starter - $50/month</option>
                  <option value="growth">Growth - $150/month</option>
                  <option value="premium">Premium - $300/month</option>
                </select>
              </div>
              <div className="flex gap-3 pt-4">
                <Button
                  onClick={() => setShowRegistration(false)}
                  variant="outline"
                  className="flex-1 border-emerald-200 text-emerald-900 hover:bg-emerald-50"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleRegister}
                  className="flex-1 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-semibold"
                >
                  Register
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
