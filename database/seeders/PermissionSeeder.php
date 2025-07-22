<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class PermissionSeeder extends Seeder
{
    public function run(): void
    {
        // Buat daftar permission
        $permissions = [
            'articles index',
            'articles create',
            'articles edit',
            'articles delete',
        ];

        // Buat permission jika belum ada
        foreach ($permissions as $permission) {
            Permission::firstOrCreate(['name' => $permission]);
        }

        // Temukan role admin
        $role = Role::firstOrCreate(['name' => 'admin']);

        // Assign semua permission ke admin
        $role->syncPermissions($permissions);
    }
}
