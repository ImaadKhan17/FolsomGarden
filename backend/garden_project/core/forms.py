from django import forms
from django.contrib.auth.forms import UserCreationForm, AuthenticationForm
from django.contrib.auth.models import User
from .models import Contact

INPUT_CLASSES = 'w-full py-4 px-6 rounded-xl border'


class LoginForm(AuthenticationForm):
    username = forms.CharField(widget=forms.TextInput(attrs={'placeholder': 'Username', 'class':'w-fill py-4 px-6 rounded-xl'}))
    password = forms.CharField(widget=forms.PasswordInput(attrs={'placeholder': 'Password', 'class':'w-fill py-4 px-6 rounded-xl'}))
class SignupForm(UserCreationForm):
    class Meta:
        model = User
        fields = ['username', 'email', 'password1', 'password2']

    username = forms.CharField(widget=forms.TextInput(attrs={'placeholder': 'Username', 'class':'w-fill py-4 px-6 rounded-xl'}))
    email = forms.EmailField(widget=forms.EmailInput(attrs={'placeholder': 'Email', 'class':'w-fill py-4 px-6 rounded-xl'}))
    password1 = forms.CharField(widget=forms.PasswordInput(attrs={'placeholder': 'Password', 'class':'w-fill py-4 px-6 rounded-xl'}))
    password2 = forms.CharField(widget=forms.PasswordInput(attrs={'placeholder': 'Confirm Password', 'class':'w-fill py-4 px-6 rounded-xl'}))

class ContactForm(forms.ModelForm):
    class Meta:
        model = Contact
        fields = ('name', 'email', 'subject', 'message')

        widgets = {
        'name': forms.TextInput(attrs={'class': INPUT_CLASSES}),
        'email': forms.TextInput(attrs={'class': INPUT_CLASSES}),
        'subject': forms.TextInput(attrs={'class': INPUT_CLASSES}),
        'message': forms.Textarea(attrs={'class': INPUT_CLASSES}),
        }