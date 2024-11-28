import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../components/Card';
import '../presentations/SpecializationPage.css';
import {specializationAPI} from '../utils/httpUtil';

function SpecializationPage() {
  const [specializations, setSpecializations] = useState([]);
  const [formData, setFormData] = useState({
    code: '',
    name: '',
    description: '',
    year: '',
    credits_required: ''
  });
  const [selectedSpec, setSelectedSpec] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchSpecializations();
  }, []);

  const fetchSpecializations = async () => {
    try {
      const response = await specializationAPI.getAll();
      setSpecializations(response.data);

    } catch (error) {
      console.error('Error fetching specializations:', error.message);
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      if (selectedSpec) {
        await specializationAPI.update(selectedSpec.id, formData);
      } else {
        await specializationAPI.create(formData);
      }
  
      fetchSpecializations();
      setFormData({
        code: '',
        name: '',
        description: '',
        year: '',
        credits_required: '',
      });
      setSelectedSpec(null);
    } catch (error) {
      console.error('Error saving specialization:', error.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      await specializationAPI.delete(id);
      fetchSpecializations();
    } catch (error) {
      console.error('Error deleting specialization:', error);
    }
  };

  const handleEdit = (spec) => {
    setSelectedSpec(spec);
    setFormData({
      code: spec.code,
      name: spec.name,
      description: spec.description,
      year: spec.year,
      credits_required: spec.creditsRequired
    });
  };

  const viewCourses = (id) => {
    navigate(`/specializations/${id}/courses`);
  };

  return (
    <div className='specializationContainer'>
      <h2>Specializations</h2>
      <br></br>
      <form className='formContainer1' onSubmit={handleSubmit}>
        <input className='inputBox'
          type="text"
          placeholder="Code"
          value={formData.code}
          onChange={(e) => setFormData({...formData, code: e.target.value})}
        />
        <input className='inputBox'
          type="text"
          placeholder="Name"
          value={formData.name}
          onChange={(e) => setFormData({...formData, name: e.target.value})}
        />
        <input className='inputBox'
          type="text"
          placeholder="Description"
          value={formData.description}
          onChange={(e) => setFormData({...formData, description: e.target.value})}
        />
        <input className='inputBox'
          type="number"
          placeholder="Year"
          value={formData.year}
          onChange={(e) => setFormData({...formData, year: e.target.value})}
        />
        <input className='inputBox'
          type="number"
          placeholder="Credits Required"
          value={formData.credits_required}
          onChange={(e) => setFormData({...formData, credits_required: e.target.value})}
        />
        <button className='submitButton1' type="submit">
          {selectedSpec ? 'Update' : 'Add'} Specialization
        </button>
      </form>

      <div style={{ 
        display: 'flex', 
        flexWrap: 'wrap', 
        gap: '20px', 
        padding: '20px',
      }}>
        {specializations.map((spec) => (
          <Card
            key={spec.id}
            specialization={spec}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onViewCourses={viewCourses}
          />
        ))}
      </div>
    </div>
  );
}

export default SpecializationPage;