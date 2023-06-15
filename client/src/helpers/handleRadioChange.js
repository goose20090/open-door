export function handleRadioChange(e, setFormData, formData) {
  setFormData({
    ...formData,
    [e.target.name]: e.target.value,
  });
  console.log(formData);
}
