// Your Firebase config (replace with your actual config)
const firebaseConfig = {
    apiKey: "microrbit-88d77",
    authDomain: "microrbit-88d77.firebaseapp.com",
    projectId: "microrbit-88d77",
    storageBucket: "microrbit-88d77.appspot.com",
    messagingSenderId: "1234567890",
    appId: "1:1234567890:web:abc123"
  };
  

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

const form = document.getElementById('onboardingForm');
const talkSection = document.getElementById('talkSection');

document.querySelectorAll('input[name="participation"]').forEach(input => {
  input.addEventListener('change', () => {
    const isSpeaker = [...document.querySelectorAll('input[name="participation"]:checked')]
                      .some(c => c.value === 'Speaker');
    talkSection.style.display = isSpeaker ? 'block' : 'none';
  });
});

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const participation = [...document.querySelectorAll('input[name="participation"]:checked')]
                        .map(c => c.value);

  const formData = {
    firstName: form.firstName.value,
    lastName: form.lastName.value,
    email: form.email.value,
    phone: form.phone.value,
    address: form.address.value,
    country: form.country.value,
    biography: form.biography.value,
    organization: form.organization.value,
    website: form.website.value,
    linkedin: form.linkedin.value,
    twitter: form.twitter.value,
    facebook: form.facebook.value,
    instagram: form.instagram.value,
    youtube: form.youtube.value,
    participation: participation,
    talkTitle: form.talkTitle.value,
    abstract: form.abstract.value,
    timestamp: new Date()
  };

  try {
    // Save data
    await db.collection('microrbit2025').add(formData);

    alert('Thank you for joining Microrbit 2025! 🚀');
    form.reset();
    talkSection.style.display = 'none';
  } catch (error) {
    console.error('Error submitting form:', error);
    alert('Something went wrong. Please try again.');
  }
});
