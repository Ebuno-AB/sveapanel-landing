import React, { useState } from 'react';
import './FAQ.css';

interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    id: '1',
    question: 'Can people without the app join?',
    answer: 'Yes, members can be added by phone and receive messages via SMS and web.'
  },
  {
    id: '2',
    question: 'Does it cost anything?',
    answer: 'Nope'
  },
  {
    id: '3',
    question: 'Do Android friends feel left out?',
    answer: 'Not at all! Our platform works seamlessly across all devices, whether iOS or Android. Everyone gets the same great experience and can participate fully in all activities.'
  },
  {
    id: '4',
    question: 'Can I make edits after I post an event?',
    answer: 'Yes, you can edit your events at any time. Simply go to your event and click the edit button to make changes to the details, timing, or description.'
  },
  {
    id: '5',
    question: 'Can I duplicate past events?',
    answer: 'Absolutely! You can easily duplicate any of your previous events to save time when creating similar gatherings. Just select the event you want to copy and choose "Duplicate".'
  },
  {
    id: '6',
    question: 'Will attendees get reminders before the event?',
    answer: 'Yes, attendees will automatically receive reminders before your events. You can customize when these reminders are sent out in your event settings.'
  }
];

const FAQ: React.FC = () => {
  const [expandedItems, setExpandedItems] = useState<string[]>(['1', '2']); // First two items expanded by default

  const toggleItem = (id: string) => {
    setExpandedItems(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  return (
    <section className="faq-section" id="faq-section">
      <div className="faq-container">
        <div className="faq-header">
          <h2 className="faq-title">FAQ</h2>
        </div>
        
        <div className="faq-list">
          {faqData.map((item) => (
            <div key={item.id} className="faq-item">
              <button 
                className={`faq-question ${expandedItems.includes(item.id) ? 'expanded' : ''}`}
                onClick={() => toggleItem(item.id)}
                aria-expanded={expandedItems.includes(item.id)}
              >
                <span className="faq-question-text">{item.question}</span>
                <span className="faq-icon">
                  {expandedItems.includes(item.id) ? '×' : '+'}
                </span>
              </button>
              
              <div className={`faq-answer ${expandedItems.includes(item.id) ? 'expanded' : ''}`}>
                <div className="faq-answer-content">
                  {item.answer}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
