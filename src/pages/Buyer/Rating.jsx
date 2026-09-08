import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Star, Upload, AlertTriangle, CheckCircle } from 'lucide-react';

export default function Rating() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [mode, setMode] = useState('rate'); // 'rate' or 'complaint'
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <div className="max-w-md mx-auto text-center py-20">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle size={40} className="text-green-500" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Feedback Submitted</h2>
        <p className="text-gray-500 mb-8">Thank you for helping us maintain trust in the marketplace.</p>
        <button 
          onClick={() => navigate('/buyer')}
          className="bg-brand-600 text-white px-8 py-3 rounded-xl font-bold shadow-md hover:bg-brand-700 transition-colors"
        >
          Back to Home
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto py-10">
      <div className="bg-white rounded-3xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="bg-brand-600 p-8 text-center text-white">
          <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle size={32} className="text-white" />
          </div>
          <h1 className="text-2xl font-bold mb-1">Order Delivered ✓</h1>
          <p className="text-brand-100 opacity-90">Order #{id}</p>
        </div>

        <div className="p-8">
          <div className="flex gap-4 mb-8">
            <button 
              className={`flex-1 py-3 font-semibold rounded-xl transition-colors border-2 ${mode === 'rate' ? 'border-brand-600 text-brand-700 bg-brand-50' : 'border-gray-200 text-gray-500 hover:border-gray-300'}`}
              onClick={() => setMode('rate')}
            >
              Rate Experience
            </button>
            <button 
              className={`flex-1 py-3 font-semibold rounded-xl transition-colors border-2 ${mode === 'complaint' ? 'border-red-500 text-red-600 bg-red-50' : 'border-gray-200 text-gray-500 hover:border-gray-300'}`}
              onClick={() => setMode('complaint')}
            >
              Report an Issue
            </button>
          </div>

          {mode === 'rate' ? (
            <div className="space-y-6 text-center">
              <h3 className="text-xl font-bold text-gray-900">How was your experience?</h3>
              
              <div className="py-4">
                <p className="text-sm font-medium text-gray-500 mb-3">Farmer & Product Rating</p>
                <div className="flex justify-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button 
                      key={star}
                      className="focus:outline-none transition-transform hover:scale-110"
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      onClick={() => setRating(star)}
                    >
                      <Star 
                        size={40} 
                        className={star <= (hoverRating || rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-200"} 
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <textarea 
                  className="w-full border border-gray-300 rounded-xl p-4 focus:ring-2 focus:ring-brand-500 outline-none resize-none"
                  rows="4"
                  placeholder="Tell us about the quality of the products..."
                ></textarea>
              </div>

              <button 
                onClick={() => setSubmitted(true)}
                className="w-full bg-brand-600 text-white py-4 rounded-xl font-bold hover:bg-brand-700 transition-colors disabled:opacity-50"
                disabled={rating === 0}
              >
                Submit Review
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="bg-red-50 text-red-800 p-4 rounded-xl flex gap-3 text-sm">
                <AlertTriangle className="shrink-0 text-red-600" size={20} />
                <p>Received poor-quality, damaged, or incorrect products? Submit a complaint below. Complaints are reviewed using evidence such as photos.</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Upload Evidence (Required)</label>
                <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:bg-gray-50 transition-colors cursor-pointer">
                  <Upload className="mx-auto text-gray-400 mb-2" size={32} />
                  <p className="text-sm font-medium text-gray-600">Click to upload photos/videos</p>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Describe Problem</label>
                <textarea 
                  className="w-full border border-gray-300 rounded-xl p-4 focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none resize-none"
                  rows="4"
                  placeholder="Explain the issue in detail..."
                ></textarea>
              </div>

              <button 
                onClick={() => setSubmitted(true)}
                className="w-full bg-red-600 text-white py-4 rounded-xl font-bold hover:bg-red-700 transition-colors"
              >
                Submit Complaint
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
