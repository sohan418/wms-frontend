import React from 'react';
import Modal from '../Modal/Modal';
import './OrderJourneyModal.css';

const OrderJourneyModal = ({ isOpen, onClose, order }) => {
  const journeySteps = [
    { status: 'Pending', description: 'Order has been placed and is awaiting processing' },
    { status: 'Processing', description: 'Order is being prepared for shipment' },
    { status: 'Shipped', description: 'Order has been shipped and is in transit' },
    { status: 'Completed', description: 'Order has been delivered successfully' }
  ];

  const getCurrentStep = (status) => {
    switch(status) {
      case 'Pending': return 0;
      case 'Processing': return 1;
      case 'Shipped': return 2;
      case 'Completed': return 3;
      default: return -1;
    }
  };

  const currentStep = getCurrentStep(order?.status);

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Order Journey">
      <div className="order-journey">
        <div className="order-info">
          <div className="order-detail">
            <span className="label">Order ID:</span>
            <span className="value">{order?.orderId}</span>
          </div>
          <div className="order-detail">
            <span className="label">Customer:</span>
            <span className="value">{order?.customerName}</span>
          </div>
          <div className="order-detail">
            <span className="label">Date:</span>
            <span className="value">{order?.orderDate}</span>
          </div>
        </div>

        <div className="journey-timeline">
          {journeySteps.map((step, index) => (
            <div 
              key={step.status} 
              className={`journey-step ${index <= currentStep ? 'completed' : ''} ${index === currentStep ? 'current' : ''}`}
            >
              <div className="step-indicator">
                <div className="step-dot"></div>
                {index < journeySteps.length - 1 && <div className="step-line"></div>}
              </div>
              <div className="step-content">
                <h3>{step.status}</h3>
                <p>{step.description}</p>
                {index <= currentStep && (
                  <span className="step-date">
                    {index === currentStep ? 'Current Status' : 'Completed'}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Modal>
  );
};

export default OrderJourneyModal;