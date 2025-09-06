// src/components/FAQ/FAQSkeleton.tsx

import { Section } from '@/components/Section';
import styles from '@/components/Skeletons/Skeleton.module.scss';

const FAQSkeleton = () => (
    <Section container="xs" style={{ paddingTop: '60px', paddingBottom: '60px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div className={styles.skeleton} style={{ height: '40px', width: '250px', marginBottom: '40px' }} />
            <div style={{ width: '100%' }}>
                {[...Array(6)].map((_, i) => (
                    <div key={i} className={styles.skeleton} style={{ height: '56px', marginBottom: '16px' }} />
                ))}
            </div>
        </div>
    </Section>
);

export { FAQSkeleton };