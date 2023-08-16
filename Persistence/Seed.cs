using Domain;
using Microsoft.AspNetCore.Identity;

namespace Persistence
{
    public class Seed
    {
        public static async Task SeedData(DataContext context, UserManager<AppUser> userManager){
            
            if (!context.Books.Any()){
                 var users = new List<AppUser>{
                    new AppUser
                    {
                        DisplayName = "Jekyll",
                        UserName = "jekyll",
                        Email = "jekyll@test.com"
                    },
                    new AppUser
                    {
                        DisplayName = "Hyde",
                        UserName = "hyde",
                        Email = "hyde@test.com"
                    }
                 };

                  foreach (var user in users)
                {
                    await userManager.CreateAsync(user, "Pa$$w0rd");
                }

                var books = new List<Book>
                {
                    new Book {
                        Title = "Harry Potter and the sorcerer's stone",
                        Author = "J.K Rowling",
                        PublishDate = "26/6/1997",
                        Quotes = new List<Quote>
                        {
                            new Quote {
                                Text = "Harry — yer a wizard.",
                                PageNumber = 50,
                                IsFavourite = true
                            },
                             new Quote {
                                Text = "Welcome to a new year at Hogwarts! Before we begin our banquet, I would like to say a few words. And here they are: Nitwit! Blubber! Oddment! Tweak!",
                                PageNumber = 123,
                                IsFavourite = false
                            },
                            new Quote {
                                Text = "“Ah, music,” he said, wiping his eyes. “A magic beyond all we do here!”",
                                PageNumber = 128,
                                IsFavourite = false
                            },

                        }
                    },
                    new Book {
                        Title = "The Hobbit",
                        Author = "J.R.R Tolkien",
                        PublishDate = "21/9/1937",
                        Quotes = new List<Quote>
                        {
                            new Quote {
                                Text = "Sorry! I don't want any adventures, thank you. Not Today. Good morning! But please come to tea -any time you like! Why not tomorrow? Good bye!”",
                                PageNumber = 7,
                                IsFavourite = false
                            },
                             new Quote {
                                Text = "“May the hair on his toes never fall out!”",
                                PageNumber = 17,
                                IsFavourite = true
                            },
                            new Quote {
                                Text = "“There is nothing like looking, if you want to find something.”",
                                PageNumber = 55,
                                IsFavourite = false
                            },
                            

                        }
                    },
                    new Book {
                        Title = "1984",
                        Author = "George Orwell",
                        PublishDate = "8/6/1949",
                        Quotes = new List<Quote>
                        {
                            new Quote {
                                Text = "WAR IS PEACE / FREEDOM IS SLAVERY / IGNORANCE IS STRENGTH.",
                                PageNumber = 4,
                                IsFavourite = true
                            },
                             new Quote {
                                Text = "'If you want a picture of the future, imagine a boot stamping on a human face—forever.'",
                                PageNumber = 267,
                                IsFavourite = false
                            },
                            new Quote {
                                Text = "The room was a world, a pocket of the past where extinct animals could walk.",
                                PageNumber = 150,
                                IsFavourite = false
                            },
                            

                        }
                    },
                    new Book {
                        Title = "The Maze Runner",
                        Author = "James Dashner",
                        PublishDate = "6/10/2009",
                        Quotes = new List<Quote>
                        {
                            new Quote {
                                Text = "“If you ain't scared… you ain't human.”",
                                PageNumber = 9,
                                IsFavourite = true
                            },
                             new Quote {
                                Text = "“It's kind of hard to ask a dead guy what he did wrong.”",
                                PageNumber = 140,
                                IsFavourite = false
                            },
                            new Quote {
                                Text = "“Avoiding other people was his new goal in life.”",
                                PageNumber = 178,
                                IsFavourite = false
                            },
                            

                        }
                    },
                    
                   
                };
        await context.Books.AddRangeAsync(books);
        await context.SaveChangesAsync();
                
            }
        }
    }
}