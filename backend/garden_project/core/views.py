from django.shortcuts import render, redirect


from item.models import Category, Item

from .forms import SignupForm, ContactForm


# Create your views here.

def index(request):
    items = Item.objects.filter(is_sold = False)[0:6]
    categories = Category.objects.all()
    return render(request, 'core/index.html', {
        'categories': categories,
        'items': items,
    })

def contact(request):
    if request.method == 'POST':
        form = ContactForm(request.POST)
        if form.is_valid():
            contact = form.save(commit=False)
            if request.user.is_authenticated:
                contact.created_by = request.user
            else:
                contact.created_by = None
            contact.save()
            return redirect('core:index')
    else:
        form = ContactForm()
    return render(request, 'core/contact.html', {'form': form})

def signup(request):
    if request.method == 'POST':
        form = SignupForm(request.POST)

        if form.is_valid():
            form.save()

            return redirect('/login/')
    else:
        form = SignupForm()
    
    return render(request, 'core/signup.html', {'form': form, 'title': 'New Item'})



