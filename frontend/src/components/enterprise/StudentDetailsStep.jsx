import React, { useState } from 'react';
import { FiUsers, FiPlus, FiEdit3, FiTrash2, FiUser, FiCalendar, FiFileText } from 'react-icons/fi';

const StudentDetailsStep = ({ formData, addStudent, removeStudent, updateStudent }) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);
  const [studentForm, setStudentForm] = useState({
    name: '',
    age: '',
    grade: '',
    condition: '',
    therapyNeeds: [],
    severity: '',
    previousTherapy: '',
    specialNotes: '',
    parentContact: '',
    emergencyContact: ''
  });

  const conditions = [
    'Speech Delay',
    'Language Disorder',
    'Articulation Disorder',
    'Stuttering/Fluency Disorder',
    'Voice Disorder',
    'Hearing Impairment',
    'Autism Spectrum Disorder',
    'Cerebral Palsy',
    'Down Syndrome',
    'Learning Disability',
    'ADHD',
    'Developmental Delay',
    'Multiple Disabilities',
    'Other'
  ];

  const therapyNeeds = [
    'Speech Therapy',
    'Hearing Activities',
    'Sign Language',
    'Social Skills Development',
    'Communication Enhancement',
    'Behavioral Support'
  ];

  const severityLevels = [
    'Mild',
    'Moderate',
    'Severe',
    'Profound'
  ];

  const handleInputChange = (field, value) => {
    setStudentForm(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleArrayChange = (field, value) => {
    setStudentForm(prev => ({
      ...prev,
      [field]: prev[field].includes(value)
        ? prev[field].filter(item => item !== value)
        : [...prev[field], value]
    }));
  };

  const handleSubmitStudent = () => {
    if (studentForm.name && studentForm.age && studentForm.condition) {
      if (editingStudent) {
        updateStudent(editingStudent.id, studentForm);
        setEditingStudent(null);
      } else {
        addStudent(studentForm);
      }
      resetForm();
    }
  };

  const resetForm = () => {
    setStudentForm({
      name: '',
      age: '',
      grade: '',
      condition: '',
      therapyNeeds: [],
      severity: '',
      previousTherapy: '',
      specialNotes: '',
      parentContact: '',
      emergencyContact: ''
    });
    setShowAddForm(false);
  };

  const handleEditStudent = (student) => {
    setStudentForm(student);
    setEditingStudent(student);
    setShowAddForm(true);
  };

  const handleCancelEdit = () => {
    setEditingStudent(null);
    resetForm();
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <FiUsers className="w-12 h-12 text-blue-600 mx-auto mb-3" />
        <h3 className="text-xl font-semibold text-gray-900">Student Details</h3>
        <p className="text-gray-600">Add information about students who will use the therapy programs</p>
      </div>

      {/* Students List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h4 className="text-lg font-semibold text-gray-900">
            Students ({formData.students.length})
          </h4>
          <button
            onClick={() => setShowAddForm(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center"
          >
            <FiPlus className="w-4 h-4 mr-2" />
            Add Student
          </button>
        </div>

        {formData.students.length === 0 ? (
          <div className="text-center py-8 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
            <FiUsers className="w-12 h-12 text-gray-400 mx-auto mb-3" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No Students Added</h3>
            <p className="text-gray-600 mb-4">Add student information to continue with your application</p>
            <button
              onClick={() => setShowAddForm(true)}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Add First Student
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {formData.students.map((student) => (
              <div key={student.id} className="bg-white border border-gray-200 rounded-lg p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                      <FiUser className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <h5 className="font-semibold text-gray-900">{student.name}</h5>
                      <p className="text-sm text-gray-600">Age: {student.age} | Grade: {student.grade || 'N/A'}</p>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleEditStudent(student)}
                      className="p-1 text-blue-600 hover:bg-blue-100 rounded"
                    >
                      <FiEdit3 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => removeStudent(student.id)}
                      className="p-1 text-red-600 hover:bg-red-100 rounded"
                    >
                      <FiTrash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                
                <div className="space-y-2 text-sm">
                  <div>
                    <span className="font-medium text-gray-700">Condition:</span>
                    <span className="ml-2 text-gray-600">{student.condition}</span>
                  </div>
                  {student.severity && (
                    <div>
                      <span className="font-medium text-gray-700">Severity:</span>
                      <span className={`ml-2 px-2 py-1 rounded-full text-xs ${
                        student.severity === 'Mild' ? 'bg-green-100 text-green-700' :
                        student.severity === 'Moderate' ? 'bg-yellow-100 text-yellow-700' :
                        student.severity === 'Severe' ? 'bg-orange-100 text-orange-700' :
                        'bg-red-100 text-red-700'
                      }`}>
                        {student.severity}
                      </span>
                    </div>
                  )}
                  {student.therapyNeeds.length > 0 && (
                    <div>
                      <span className="font-medium text-gray-700">Therapy Needs:</span>
                      <div className="mt-1 flex flex-wrap gap-1">
                        {student.therapyNeeds.map((need, index) => (
                          <span key={index} className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs">
                            {need}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Add/Edit Student Form */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-gray-900">
                  {editingStudent ? 'Edit Student' : 'Add New Student'}
                </h3>
                <button
                  onClick={editingStudent ? handleCancelEdit : resetForm}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ×
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Basic Information */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Student Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={studentForm.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Full name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Age <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="25"
                    value={studentForm.age}
                    onChange={(e) => handleInputChange('age', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Age in years"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Grade/Class</label>
                  <input
                    type="text"
                    value={studentForm.grade}
                    onChange={(e) => handleInputChange('grade', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Current grade or class"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Primary Condition <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={studentForm.condition}
                    onChange={(e) => handleInputChange('condition', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select condition</option>
                    {conditions.map(condition => (
                      <option key={condition} value={condition}>{condition}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Severity Level</label>
                  <select
                    value={studentForm.severity}
                    onChange={(e) => handleInputChange('severity', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select severity</option>
                    {severityLevels.map(level => (
                      <option key={level} value={level}>{level}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Parent/Guardian Contact</label>
                  <input
                    type="tel"
                    value={studentForm.parentContact}
                    onChange={(e) => handleInputChange('parentContact', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="+94 77 123 4567"
                  />
                </div>
              </div>

              {/* Therapy Needs */}
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-3">Therapy Needs</label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {therapyNeeds.map(need => (
                    <label key={need} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={studentForm.therapyNeeds.includes(need)}
                        onChange={() => handleArrayChange('therapyNeeds', need)}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="ml-2 text-sm text-gray-700">{need}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Additional Information */}
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Previous Therapy Experience</label>
                <textarea
                  value={studentForm.previousTherapy}
                  onChange={(e) => handleInputChange('previousTherapy', e.target.value)}
                  rows={2}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Any previous therapy experience or treatments..."
                />
              </div>

              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Special Notes</label>
                <textarea
                  value={studentForm.specialNotes}
                  onChange={(e) => handleInputChange('specialNotes', e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Any special considerations, allergies, behavioral notes, or specific requirements..."
                />
              </div>

              {/* Form Actions */}
              <div className="flex justify-end space-x-3 mt-6 pt-4 border-t">
                <button
                  onClick={editingStudent ? handleCancelEdit : resetForm}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmitStudent}
                  disabled={!studentForm.name || !studentForm.age || !studentForm.condition}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    studentForm.name && studentForm.age && studentForm.condition
                      ? 'bg-blue-600 text-white hover:bg-blue-700'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  {editingStudent ? 'Update Student' : 'Add Student'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Bulk Import Option */}
      {formData.students.length === 0 && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <h4 className="font-medium text-yellow-900 mb-2">Need to add many students?</h4>
          <p className="text-sm text-yellow-800 mb-3">
            For institutions with 20+ students, we can provide a bulk import template or assist with data entry.
          </p>
          <button className="text-sm text-yellow-700 underline hover:text-yellow-900">
            Contact us for bulk import assistance
          </button>
        </div>
      )}
    </div>
  );
};

export default StudentDetailsStep;
