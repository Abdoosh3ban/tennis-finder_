import { useNavigate } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Check, X } from 'lucide-react';

export default function PricingPage() {
  const navigate = useNavigate();

  const plans = [
    {
      name: 'Starter',
      price: '0',
      period: 'Free forever',
      description: 'Perfect for testing and small projects',
      features: [
        '1,000 messages/month',
        '100 concurrent connections',
        '1 workspace',
        '7-day message history',
        'Basic API access',
        'Community support',
        'OpenAPI documentation'
      ],
      notIncluded: [
        'Custom domains',
        'Priority support',
        'Advanced analytics',
        'SLA guarantee'
      ],
      cta: 'Get Started',
      highlighted: false
    },
    {
      name: 'Professional',
      price: '49',
      period: 'per month',
      description: 'For growing applications and teams',
      features: [
        '100,000 messages/month',
        '1,000 concurrent connections',
        '5 workspaces',
        '30-day message history',
        'Full API access',
        'Priority email support',
        'Usage analytics dashboard',
        'Webhook integrations',
        'Custom branding'
      ],
      notIncluded: [
        'Dedicated infrastructure',
        'Phone support',
        'Custom contracts'
      ],
      cta: 'Start Free Trial',
      highlighted: true
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      period: 'contact us',
      description: 'For large-scale applications',
      features: [
        'Unlimited messages',
        'Unlimited connections',
        'Unlimited workspaces',
        'Unlimited message history',
        'Full API access',
        '24/7 phone & email support',
        'Advanced analytics',
        'Custom integrations',
        'Dedicated account manager',
        'SLA guarantee (99.9%)',
        'Custom contracts',
        'On-premise deployment option',
        'Multi-region support'
      ],
      notIncluded: [],
      cta: 'Contact Sales',
      highlighted: false
    }
  ];

  const addons = [
    {
      name: 'Additional Messages',
      price: '$10',
      unit: 'per 100K messages'
    },
    {
      name: 'Extended History',
      price: '$15',
      unit: 'per month (90 days)'
    },
    {
      name: 'Priority Support',
      price: '$99',
      unit: 'per month'
    },
    {
      name: 'Custom Integration',
      price: '$299',
      unit: 'one-time setup'
    }
  ];

  return (
    <div className="min-h-screen bg-white pt-16">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Badge className="mb-4">Pricing Plans</Badge>
          <h1 className="text-5xl text-gray-900 mb-6">
            Simple, Transparent Pricing
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Choose the plan that fits your needs. All plans include our core features with no hidden fees.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Badge variant="outline" className="text-sm">
              💳 USD Billing via Stripe
            </Badge>
            <Badge variant="outline" className="text-sm">
              🇪🇬 EGP Support Coming Soon
            </Badge>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-8">
            {plans.map((plan, index) => (
              <Card 
                key={index} 
                className={`relative p-8 ${
                  plan.highlighted 
                    ? 'border-2 border-blue-600 shadow-xl' 
                    : 'border border-gray-200'
                }`}
              >
                {plan.highlighted && (
                  <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-600">
                    Most Popular
                  </Badge>
                )}

                <div className="mb-6">
                  <h3 className="text-2xl text-gray-900 mb-2">{plan.name}</h3>
                  <p className="text-gray-600 text-sm">{plan.description}</p>
                </div>

                <div className="mb-6">
                  <div className="flex items-baseline gap-2">
                    {plan.price === 'Custom' ? (
                      <span className="text-4xl text-gray-900">{plan.price}</span>
                    ) : (
                      <>
                        <span className="text-sm text-gray-600">$</span>
                        <span className="text-5xl text-gray-900">{plan.price}</span>
                      </>
                    )}
                  </div>
                  <p className="text-gray-600 mt-1">{plan.period}</p>
                </div>

                <Button 
                  className={`w-full mb-6 ${
                    plan.highlighted 
                      ? '' 
                      : 'bg-gray-900 hover:bg-gray-800'
                  }`}
                  onClick={() => {
                    if (plan.name === 'Enterprise') {
                      window.location.href = 'mailto:sales@chatconnect.com';
                    } else {
                      navigate('/signup');
                    }
                  }}
                >
                  {plan.cta}
                </Button>

                <div className="space-y-3">
                  {plan.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700 text-sm">{feature}</span>
                    </div>
                  ))}
                  {plan.notIncluded.map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-3 opacity-40">
                      <X className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-600 text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </Card>
            ))}
          </div>

          {/* Add-ons Section */}
          <div className="mt-20">
            <div className="text-center mb-12">
              <h2 className="text-3xl text-gray-900 mb-4">Add-ons & Extensions</h2>
              <p className="text-gray-600">Enhance your plan with additional features</p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {addons.map((addon, index) => (
                <Card key={index} className="p-6">
                  <h3 className="text-gray-900 mb-2">{addon.name}</h3>
                  <div className="text-2xl text-blue-600 mb-1">{addon.price}</div>
                  <p className="text-sm text-gray-600">{addon.unit}</p>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl text-gray-900 mb-12 text-center">
            Frequently Asked Questions
          </h2>

          <div className="space-y-6">
            <Card className="p-6">
              <h3 className="text-gray-900 mb-2">Can I change plans later?</h3>
              <p className="text-gray-600">
                Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately, 
                and we'll prorate any charges.
              </p>
            </Card>

            <Card className="p-6">
              <h3 className="text-gray-900 mb-2">What payment methods do you accept?</h3>
              <p className="text-gray-600">
                We accept all major credit cards (Visa, Mastercard, Amex) through Stripe. 
                Enterprise customers can also pay via wire transfer or invoice.
              </p>
            </Card>

            <Card className="p-6">
              <h3 className="text-gray-900 mb-2">Is there a free trial?</h3>
              <p className="text-gray-600">
                Yes! All paid plans come with a 14-day free trial. No credit card required to start. 
                The Starter plan is free forever.
              </p>
            </Card>

            <Card className="p-6">
              <h3 className="text-gray-900 mb-2">What happens if I exceed my message limit?</h3>
              <p className="text-gray-600">
                Your service won't be interrupted. We'll automatically charge for additional messages 
                at $10 per 100K messages, and notify you via email.
              </p>
            </Card>

            <Card className="p-6">
              <h3 className="text-gray-900 mb-2">Do you offer discounts for startups or non-profits?</h3>
              <p className="text-gray-600">
                Yes! We offer special pricing for qualifying startups and non-profit organizations. 
                Contact our sales team for more information.
              </p>
            </Card>

            <Card className="p-6">
              <h3 className="text-gray-900 mb-2">When will EGP billing be available?</h3>
              <p className="text-gray-600">
                We're actively working on adding Egyptian Pound (EGP) support to make our platform 
                more accessible to regional markets. Stay tuned for updates!
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl text-gray-900 mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Join thousands of developers building amazing chat experiences with ChatConnect.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" onClick={() => navigate('/signup')}>
              Start Free Trial
            </Button>
            <Button size="lg" variant="outline" onClick={() => window.location.href = 'mailto:sales@chatconnect.com'}>
              Contact Sales
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
