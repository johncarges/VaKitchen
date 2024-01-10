import seed_data as sd
import database

if __name__ == '__main__':
    
    # seed items:
    database.clear_table('sql/items/clear_items.sql')
    for item in sd.items:
        
        database.insert('sql/items/post_item.sql',item)


    # seed users:
    for user in sd.users:
        print(user['username'])