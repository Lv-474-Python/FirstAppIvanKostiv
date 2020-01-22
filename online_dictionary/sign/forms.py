from django import forms


class SignUpForm(forms.Form):
    username = forms.CharField(widget=forms.TextInput(attrs={'class': 'form-control',
                                                             'placeholder': "Enter your login", }))
    email = forms.EmailField(widget=forms.TextInput(attrs={'class': 'form-control',
                                                           'placeholder': "Enter your email", }))
    password = forms.CharField(widget=forms.PasswordInput(attrs={'class': 'form-control',
                                                                 'placeholder': "Enter your password", }))
    confirm = forms.CharField(widget=forms.PasswordInput(attrs={'class': 'form-control',
                                                                'placeholder': "Confirm your password", }))
