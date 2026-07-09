# 🎨 SIKOLA Design Tokens

> Semua komponen frontend wajib menggunakan Design Token.
> Tidak diperbolehkan menggunakan warna, spacing, atau font secara hardcode.

---

# 🎯 Color Palette

## Primary

| Token | Value | Kegunaan |
|-------|-------|----------|
| primary | #5E4AE3 | Warna utama aplikasi |
| primary-foreground | #FFFFFF | Text di atas primary |

---

## Secondary

| Token | Value | Kegunaan |
|-------|-------|----------|
| secondary | #E6B85C | Accent |
| secondary-foreground | #FFFFFF | Text |

---

## Background

| Token | Value |
|-------|-------|
| background | #F8FAFC |
| surface | #FFFFFF |
| glass | rgba(255,255,255,0.75) |

---

## Text

| Token | Value |
|-------|-------|
| text-primary | #1E293B |
| text-secondary | #64748B |
| text-disabled | #94A3B8 |

---

## Border

| Token | Value |
|-------|-------|
| border | #E2E8F0 |

---

## Status

### Success

#22C55E

### Warning

#F59E0B

### Danger

#EF4444

### Info

#3B82F6

---

# ✍ Typography

## Heading

Poppins

Weight

- SemiBold
- Bold

---

## Body

Plus Jakarta Sans

Weight

- Regular
- Medium
- SemiBold

---

# 📏 Border Radius

| Token | Value |
|-------|-------|
| radius-sm | 8px |
| radius-md | 12px |
| radius-lg | 16px |
| radius-xl | 20px |
| radius-full | 999px |

---

# 📦 Spacing

| Token | Value |
|-------|-------|
| xs | 4px |
| sm | 8px |
| md | 16px |
| lg | 24px |
| xl | 32px |
| 2xl | 40px |

---

# 🌑 Shadow

## Card

Soft Shadow

## Floating Button

Medium Shadow

## Modal

Large Shadow

---

# 📱 Breakpoint

| Device | Width |
|---------|------|
| Mobile | 320 - 767 |
| Tablet | 768 - 1023 |
| Desktop | 1024+ |

---

# 🪟 Glassmorphism

- Background Blur
- Semi Transparent
- Soft Border
- Soft Shadow

Semua Card menggunakan style yang konsisten.

---

# 🎯 Icon

Default

24px

Small

20px

Large

32px

---

# 🖼 Asset Rules

Logo

public/logo/

Maskot

public/mascot/

Icon

public/icons/

Illustration

public/images/

---

# 📌 Rules

✅ Gunakan token.

❌ Jangan hardcode.

Contoh yang benar

bg-primary

text-primary

rounded-xl

p-md

Contoh yang salah

bg-[#5E4AE3]

rounded-[18px]

px-[13px]