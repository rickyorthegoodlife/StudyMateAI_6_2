import React, { useState } from 'react'

const Home = ({ onSubmit, loading }) => {
  const [formData, setFormData] = useState({
    topic: '',
    text: '',
    studyLevel: 'sixième',
    specialty: '',
    sessionLength: 'courte',
    pdfFile: null
  })

  const [errors, setErrors] = useState({})
  const [fileName, setFileName] = useState('')

  const showSpecialtyField = ['licence1', 'licence2', 'licence3', 'master1', 'master2'].includes(formData.studyLevel)

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file && file.type === 'application/pdf') {
      setFormData({ ...formData, pdfFile: file, text: '' })
      setFileName(file.name)
    }
  }

  const validateForm = () => {
    const newErrors = {}
    
    if (!formData.topic.trim()) {
      newErrors.topic = 'Le sujet est obligatoire'
    }
    
    if (!formData.pdfFile && formData.text && formData.text.split(' ').length < 150) {
      newErrors.text = 'Le texte doit contenir au moins 150 mots'
    }

    if (showSpecialtyField && !formData.specialty.trim()) {
      newErrors.specialty = 'La spécialité est obligatoire'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (validateForm()) {
      const numberOfQuestions = {
        courte: 10,
        moyenne: 15,
        longue: 20
      }[formData.sessionLength]
      
      onSubmit({
        ...formData,
        numberOfQuestions
      })
    }
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg max-w-2xl mx-auto">
      <div className="space-y-6">
        {/* Champ Sujet */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">Sujet *</label>
          <input
            type="text"
            value={formData.topic}
            onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
            className={`w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200 ${
              errors.topic ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Entrez un sujet..."
          />
          {errors.topic && <p className="text-red-500 text-sm mt-1">{errors.topic}</p>}
        </div>

        {/* Champ Fichier PDF - Version modernisée */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">Fichier PDF (optionnel)</label>
          <div className="relative group">
            <div className="flex items-center justify-center w-full h-32 border-2 border-dashed rounded-lg transition-all duration-200 cursor-pointer hover:border-[#6366f1] hover:bg-gradient-to-br from-[#6366f1]/10 to-[#9333ea]/10">
              <input
                type="file"
                accept="application/pdf"
                onChange={handleFileChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                id="file-upload"
              />
              <div className="text-center">
                <svg className="w-8 h-8 mx-auto mb-2 text-gray-400 group-hover:text-[#6366f1]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
                <p className="text-sm text-gray-500 dark:text-gray-400 group-hover:text-[#6366f1]">
                  {fileName || (
                    <>
                      <span className="font-medium bg-gradient-to-r from-[#6366f1] to-[#9333ea] bg-clip-text text-transparent">Cliquez pour uploader</span> ou glissez-déposez
                    </>
                  )}
                </p>
                {fileName && (
                  <p className="text-xs text-gray-400 mt-1">Fichier sélectionné : {fileName}</p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Champ Texte (si aucun PDF) */}
        {!formData.pdfFile && (
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">Texte (optionnel)</label>
            <textarea
              value={formData.text}
              onChange={(e) => setFormData({ ...formData, text: e.target.value })}
              className={`w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200 ${
                errors.text ? 'border-red-500' : 'border-gray-300'
              }`}
              rows="4"
              placeholder="Entrez votre texte ici (minimum 150 mots)..."
            />
            {errors.text && <p className="text-red-500 text-sm mt-1">{errors.text}</p>}
          </div>
        )}

        {/* Durée de la session et Niveau d'étude */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">Durée de la session</label>
            <select
              value={formData.sessionLength}
              onChange={(e) => setFormData({ ...formData, sessionLength: e.target.value })}
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
            >
              <option value="courte">Courte (5-10 questions)</option>
              <option value="moyenne">Moyenne (10-15 questions)</option>
              <option value="longue">Longue (15-20 questions)</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">Niveau d'étude</label>
            <select
              value={formData.studyLevel}
              onChange={(e) => setFormData({ ...formData, studyLevel: e.target.value })}
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
            >
              <option value="sixième">Sixième</option>
              <option value="cinquième">Cinquième</option>
              <option value="quatrième">Quatrième</option>
              <option value="troisième">Troisième</option>
              <option value="seconde">Seconde</option>
              <option value="première">Première</option>
              <option value="terminale">Terminale</option>
              <option value="licence1">Licence 1</option>
              <option value="licence2">Licence 2</option>
              <option value="licence3">Licence 3</option>
              <option value="master1">Master 1</option>
              <option value="master2">Master 2</option>
            </select>
          </div>
        </div>

        {/* Champ Spécialité (si niveau supérieur) */}
        {showSpecialtyField && (
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">Spécialité *</label>
            <input
              type="text"
              value={formData.specialty}
              onChange={(e) => setFormData({ ...formData, specialty: e.target.value })}
              className={`w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200 ${
                errors.specialty ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Entrez votre spécialité..."
            />
            {errors.specialty && <p className="text-red-500 text-sm mt-1">{errors.specialty}</p>}
          </div>
        )}

        {/* Bouton de soumission */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-gradient-to-r from-[#6366f1] to-[#9333ea] text-white py-2 rounded-md hover:opacity-90 transition-opacity disabled:opacity-50"
        >
          {loading ? 'Génération en cours...' : 'Démarrer le quiz'}
        </button>
      </div>
    </form>
  )
}

export default Home
